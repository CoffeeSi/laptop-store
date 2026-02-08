import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "@/features/user/store/userStore";

export function useLogout() {
    const clearAuth = useAuthStore(state => state.clearAuth);
    const clearUser = useUserStore(state => state.clearUser);

    return async () => {
        try {
            await authApi.logout();
        } finally {
            clearAuth();
            clearUser();
        }
    };
}