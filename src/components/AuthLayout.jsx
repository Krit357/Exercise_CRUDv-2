import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h1>This is Header</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
