import {Outlet, Navigate} from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("token");
  return user ? <Outlet /> : <Navigate to="/studentlogin" />;
};

export default ProtectedRoute;