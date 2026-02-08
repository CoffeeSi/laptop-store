import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { useUser } from '@/features/user/hooks/useUser';
import type { ILoginPayload } from '../types/login.types';
import type { AxiosError } from 'axios';

export const useLogin = () => {
    const setUser = useAuthStore(state => state.setAuth);
    const fetchUser = useUser();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    async function login(payload: ILoginPayload) {
        setError(null);
        setLoading(true);

        try {
            const data = await authApi.login(payload);
            const userID = data.data.userID;
            const role = data.data.role;
            setUser(userID, role);
            await fetchUser(userID);
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message?: string }>;
            const message = axiosError.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, message: message };
        } finally {
            setLoading(false);
        }
        return { success: true };
    }

    return { login, error, loading };
};
