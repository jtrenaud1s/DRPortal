import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskListView from "./views/tasks/TaskListView";
import SignUpView from "./views/auth/SignUpView";
import SignInView from "./views/auth/SignInView";
import Protect from "./components/auth/Protect";
import { useAppDispatch } from "./store";
import { refreshFailed, refreshPending, refreshSuccess } from "./features/auth";
import Axios from "./utils/axios";
import { Spinner } from "react-bootstrap";
import jwt_decode, { JwtPayload } from "jwt-decode";
import CommitteeListView from "./views/committees/CommitteeListView";
import DashboardView from "./views/Dashboard";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  


  useEffect(() => {
const refresh = () => {
  dispatch(refreshPending());

  const refreshToken = localStorage.getItem("refresh_token");

  if (refreshToken === null) {
    console.log("Refresh token is not available");
    dispatch(refreshFailed(""));
    setLoading(false);
  } else {
    const tokenParts: JwtPayload = jwt_decode(refreshToken);
    const now = Math.ceil(Date.now() / 1000);

    if (tokenParts.exp! > now) {
      Axios.post("/auth/refresh/", { refresh: refreshToken })
        .then((response) => {
          dispatch(refreshSuccess(response.data.access));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          dispatch(refreshFailed(err));
          setLoading(false);
        });
    } else {
      console.log("Refresh token is expired", tokenParts.exp, now);
      dispatch(refreshFailed("You've been signed out due to inactivity"));
      setLoading(false);
    }
  }
};

    refresh()
  }, [dispatch]);

  return (
    <BrowserRouter>
      {!loading ? (
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <DashboardView />
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
          <Route
            path="/committees"
            element={
              <Protect>
                <CommitteeListView />
              </Protect>
            }
          />
          <Route
            path="/tasks"
            element={
              <Protect>
                <TaskListView />
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
