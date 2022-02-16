import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

interface IProtectProps {
  inverse?: boolean;
}

const Protect: React.FC<IProtectProps> = ({ children, inverse }) => {
  const authState = useAppSelector((state) => state.auth.isAuthenticated);
  if (!inverse)
    return <React.Fragment>{authState ? children : <Navigate to="/signin" />}</React.Fragment>;
  return (
    <React.Fragment>{authState ? <Navigate to="/" /> : children}</React.Fragment>
  );
};

export default Protect;
