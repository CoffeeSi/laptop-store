import { useUserStore } from "@/features/user/store/userStore";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";

function AdminRoute({children}: {children: JSX.Element}): React.JSX.Element {
  const { isLoggedIn, isLoading } = useAuthStore();
  const { user } = useUserStore();

  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default AdminRoute;
