import apiClient from "@/shared/api/request"
import type { IUser } from "../types/user.types";

export const userApi = {
    fetchUsers: async (): Promise<IUser[]> => {
        const response = await apiClient.get('/users/');
        return response.data;
    },
    fetchUserById: async (id: string | null): Promise<IUser> => {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    }
}