import { useAuthStore } from "@/features/auth/store/authStore";
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";

function PrivateRoute({children}: {children: JSX.Element}): React.JSX.Element {
  const { isLoggedIn, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;