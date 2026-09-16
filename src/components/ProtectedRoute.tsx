import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

// Client-side auth gate — replaces TanStack Start's `_authenticated`
// beforeLoad redirect. Renders nothing while the initial session check is
// in flight, then either redirects to /auth or renders the nested route.
export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}
