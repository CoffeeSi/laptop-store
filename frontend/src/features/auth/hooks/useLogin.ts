import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import type { ILoginPayload } from '../types/login.types';
import type { AxiosError } from 'axios';

export const useLogin = () => {
    const setUser = useAuthStore(state => state.setAuth);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    async function login(payload: ILoginPayload) {
        setError(null);
        setLoading(true);

        try {
            const data = await authApi.login(payload);
            setUser(data.data.userID);
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
