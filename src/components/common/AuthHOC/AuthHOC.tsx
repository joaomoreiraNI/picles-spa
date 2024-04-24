import { Navigate, Outlet } from "react-router-dom";
import { useShelter } from "../../../hooks/useShelter";

export function AuthHOC() {
  const { data, isLoading } = useShelter();
  const canAccess = !!data?.whatsApp;

  if (isLoading) null;
  if (!canAccess) return <Navigate to="/admin" />;
  return <Outlet />;
}
