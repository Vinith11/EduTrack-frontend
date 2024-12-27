import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ allowedRoles }) => {
  const jwt = useSelector((state) => state.auth.jwt);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  if (!jwt) {
    return <Navigate to="/" replace />;
  }

//  if (!allowedRoles.includes(role)) {
    //return <Navigate to={role === "Student" ? "/profile" : "/profile"} replace />;
  //}

  return <Outlet />;
};

export default ProtectedRoutes;