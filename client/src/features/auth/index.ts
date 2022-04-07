import { createSlice, Middleware } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import Axios from "../../utils/axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    currentUser: {},
    isAuthenticated: false,
    accessToken: "",
    error: "",
  },
  reducers: {
    signupPending: (state) => {
      state.isLoading = true;
    },
    signupSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    signupFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.accessToken = "";
      state.currentUser = {};
    },
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      //state.currentUser = action.payload.user;
      state.accessToken = action.payload.access;
      state.isAuthenticated = true;
      state.error = "";
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.error = action.payload;
    },
    refreshPending: (state) => {
      state.isLoading = true;
    },
    refreshSuccess: (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    refreshFailed: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.accessToken = "";
      state.currentUser = {};
      state.error = action.payload;
    },
    profileFetched: (state, action) => {
      state.currentUser = action.payload
    }
  },
});

export const authMiddleware: Middleware =
  (store) => (next) => async (action) => {
    next(action);
    if (loginSuccess.match(action)) {
      localStorage.setItem("refresh_token", action.payload.refresh);
      //Get user profile and inject it into payload before it reaches reducer
      try {
        const tokenPayload: DecodedJWT = jwt_decode(action.payload.refresh);
        const userId = tokenPayload.user_id;
        const response = await Axios.get(`users/${userId}`, {
          headers: {
            Authorization: `JWT ${action.payload.access}`
          }
        });
        store.dispatch(profileFetched(response.data));
      } catch (err) {
        console.log(err);
      }
    } else if (refreshSuccess.match(action)) {
      try {
        const tokenPayload: DecodedJWT = jwt_decode(action.payload);
        const userId = tokenPayload.user_id;
        const response = await Axios.get(`users/${userId}`, {
          headers: {
            Authorization: `JWT ${action.payload}`,
          },
        });
        store.dispatch(profileFetched(response.data));
      } catch (err) {
        console.log(err);
      }
    } else if (logout.match(action) || refreshFailed.match(action)) {
      localStorage.removeItem("refresh_token");
    }
  };

const { reducer, actions } = authSlice;

export const {
  profileFetched,
  signupFailed,
  signupPending,
  signupSuccess,
  logout,
  loginPending,
  loginSuccess,
  loginFailed,
  refreshPending,
  refreshSuccess,
  refreshFailed,
} = actions;

export default reducer;
