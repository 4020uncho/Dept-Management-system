import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/studentlogin", storageKey = "token" }) => {
  const authValue = localStorage.getItem(storageKey);
  return authValue ? <Outlet /> : <Navigate to={redirectPath} />;
};

export const StudentProtectedRoute = () => (
  <ProtectedRoute redirectPath="/studentlogin" storageKey="token" />
);

export const AdminProtectedRoute = () => (
  <ProtectedRoute redirectPath="/administrator" storageKey="admin_token" />
);

export default ProtectedRoute;