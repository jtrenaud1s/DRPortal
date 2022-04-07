import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../models/user";
import { useAppSelector } from "../../store";

interface IProtectProps {
  inverse?: boolean;
  staff?: boolean;
}

const Protect: React.FC<IProtectProps> = ({ children, inverse, staff }) => {
  const authState = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.currentUser) as User;

  if (staff)
    return <>{authState && user.is_staff ? children : <Navigate to="/" />}</>;

  if (!inverse) return <>{authState ? children : <Navigate to="/signin" />}</>;
  return <>{authState ? <Navigate to="/" /> : children}</>;
};

export default Protect;
