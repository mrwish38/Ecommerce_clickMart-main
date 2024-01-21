import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { loading, isAuthenticated} = useSelector((state) => state.user);

  return (
    <Fragment>
        {loading === false && (
            isAuthenticated ? <Outlet /> : <Navigate to="/login" />
        )}
    </Fragment>
  )
};

export default ProtectedRoute;
