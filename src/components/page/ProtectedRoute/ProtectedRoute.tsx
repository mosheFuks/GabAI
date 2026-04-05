import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PageContext } from "../../../StoreInfo/page-storage";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { logedUser, isAuthLoading } = useContext(PageContext) as any;

  if (isAuthLoading) {
    return null;
  }

  /*if (!logedUser || !logedUser.rol) {
    return <Navigate to="/sign-in" replace />;
  }*/

  if (!logedUser || !logedUser.rol ||!allowedRoles.includes(logedUser.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
