import { Outlet, Navigate, useLocation, useNavigate } from "react-router";

const AuthLayout = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Allow access to login and register pages
  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      {token && <button onClick={handleLogout}>Logout</button>}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
