import { Outlet, Navigate, useLocation } from "react-router";

const AuthLayout = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  console.log("Token:", token, "Path:", location.pathname);
  console.log("Token in LocalStorage:", token);
  // ✅ Allow access to login and register pages
  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
