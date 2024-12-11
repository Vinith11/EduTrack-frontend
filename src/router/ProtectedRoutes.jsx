// ProtectedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ allowedRoles }) => {
  const jwt = useSelector((state) => state.auth.jwt);
  const role = useSelector((state) => state.auth.role);

  if (!jwt) {
    // If JWT is not present, redirect to the appropriate auth page
    return <Navigate to={`/${role === "Student" ? "student-signin" : "faculty-signin"}`} replace />;
  }

  if (!allowedRoles.includes(role)) {
    // If role is not allowed, redirect to a default route
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;