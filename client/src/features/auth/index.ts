import { createSlice, Middleware } from "@reduxjs/toolkit";

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
    logout: (state) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.accessToken = ""
      state.currentUser = {}
    },
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      //state.currentUser = action.payload.user;
      state.accessToken = action.payload.access
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
      state.accessToken = action.payload.access;
      state.isAuthenticated = true;
    },
    refreshFailed: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.accessToken = "";
      state.currentUser = {};
      state.error = action.payload;
    },
  },
});

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  if (loginSuccess.match(action)) {
    localStorage.setItem("refresh_token", action.payload.refresh);
    //Get user profile and inject it into payload before it reaches reducer
  } else if(logout.match(action) || refreshFailed.match(action)) {
    localStorage.removeItem('refresh_token')
  }
}

const { reducer, actions } = authSlice;

export const { logout, loginPending, loginSuccess, loginFailed, refreshPending, refreshSuccess, refreshFailed } =
  actions;

export default reducer;
