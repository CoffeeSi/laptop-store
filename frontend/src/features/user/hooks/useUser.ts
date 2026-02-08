import { userApi } from "../api/userApi";
import { useUserStore } from "../store/userStore";

export function useUser() {
    const setUser = useUserStore(state => state.setUser);

    async function fetchUser(user_id: string) {
        try {
            const userData = await userApi.fetchUserById(user_id);
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };
    return fetchUser;
}