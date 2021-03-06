import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskListView from "./views/TaskListView";
import SignUpView from "./views/auth/SignUpView";
import SignInView from "./views/auth/SignInView";
import Protect from "./features/auth/Protect";
import { useAppDispatch } from "./store";
import { refreshFailed, refreshPending, refreshSuccess } from "./features/auth";
import Axios from "./utils/axios";
import { Spinner } from "react-bootstrap";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(refreshPending());

    const refreshToken = localStorage.getItem("refresh_token");
    console.log("Saved refresh token: ", refreshToken);

    if (refreshToken === null) {
      console.log("Refresh token is not available");
      dispatch(refreshFailed("Refresh Token Non-existant"));
      setLoading(false);
    } else {
      const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
      const now = Math.ceil(Date.now() / 1000);

      if (tokenParts.exp > now) {
        Axios.post("/auth/refresh/", { refresh: refreshToken })
          .then((response) => {
            dispatch(refreshSuccess(response.data.access));
            console.log("setting token", response.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            dispatch(refreshFailed(err));
            setLoading(false);
          });
      } else {
        console.log("Refresh token is expired", tokenParts.exp, now);
        dispatch(refreshFailed("Refresh Token Expired"));
        setLoading(false);
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      {!loading ? (
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <TaskListView />
              </Protect>
            }
          />
          <Route
            path="/signup"
            element={
              <Protect inverse>
                <SignUpView />
              </Protect>
            }
          />
          <Route
            path="/signin"
            element={
              <Protect inverse>
                <SignInView />
              </Protect>
            }
          />
        </Routes>
      ) : (
        <div className="h-100 d-flex justify-content-center align-items-center bg-dark">
          <Spinner animation="border" />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
