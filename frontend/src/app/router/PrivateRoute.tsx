import { useAuthStore } from "@/features/auth/store/authStore";
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";

function PrivateRoute({children, requiredRole}: {children: JSX.Element, requiredRole?: string}): React.JSX.Element {
  const { isLoggedIn, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole) {
    const role = useAuthStore(state => state.role);
    if (role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }
  return children;
}

export default PrivateRoute;