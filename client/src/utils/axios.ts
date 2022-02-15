import axios from "axios";
import {
  refreshFailed,
  refreshPending,
  refreshSuccess,
} from "../features/auth";
import { StoreType } from "../store";

const baseURL = "http://localhost:8000/api/";

let store: StoreType = null;

export const setStore = (_store: StoreType) => {
  store = _store;
};

const Axios = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    if (store!.getState().auth.accessToken) {
      console.log("request interceptor: add token to headers");
      config.headers!["Authorization"] =
        "JWT " + store!.getState().auth.accessToken;
    } else {
      console.log("No access token available")
    }
    return config;
  },
  (err) => {
    console.log(err);
    Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      console.log(
        "A server/network error occurred providing no details. Check CORS."
      );
      console.log(error);
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "/auth/refresh/"
    ) {
      window.location.href = "/signin";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          store!.dispatch(refreshPending());
          return Axios.post("/auth/refresh/", { refresh: refreshToken })
            .then((response) => {
              store!.dispatch(refreshSuccess(response.data.access));
              originalRequest.defaults.headers.common["Authorization"] =
                "JWT " + response.data.access;

              return Axios(originalRequest);
            })
            .catch((err) => {
              console.log(err);
              store!.dispatch(refreshFailed(err));
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          store!.dispatch(refreshFailed("Refresh Token Expired"));
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token is not available");
        store!.dispatch(refreshFailed("Refresh Token Non-existant"));
        window.location.href = "/login/";
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
