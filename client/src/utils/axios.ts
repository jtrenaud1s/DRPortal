import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  refreshFailed,
  refreshPending,
  refreshSuccess,
} from "../features/auth";
import { StoreType } from "../store";
import jwt_decode, { JwtPayload } from 'jwt-decode'

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
      console.log("No access token available");
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
        const tokenParts: JwtPayload = jwt_decode(refreshToken)

        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp! > now) {
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
          store!.dispatch(
            refreshFailed("You've been signed out due to inactivity")
          );
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token is not available");
        store!.dispatch(refreshFailed("Please Sign In"));
        window.location.href = "/login/";
      }
    }
    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    console.log("Using axios in query")
    try {
      const result = await Axios({ url: baseUrl + url, method, data });
      console.log(result.request.headers)
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default Axios;
