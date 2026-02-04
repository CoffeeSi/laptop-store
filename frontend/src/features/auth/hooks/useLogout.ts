import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useLogout() {
    const clearAuth = useAuthStore(state => state.clearAuth);

    return async () => {
        try {
            await authApi.logout();
        } finally {
            clearAuth();
        }
    };
}