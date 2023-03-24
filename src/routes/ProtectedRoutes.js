import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate path="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
