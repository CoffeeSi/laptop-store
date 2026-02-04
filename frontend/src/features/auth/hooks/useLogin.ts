import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import type { ILoginPayload } from '../types/login.types';

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
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
            return { success: false };
        } finally {
            setLoading(false);
        }
        return { success: true };
    }

    return { login, error, loading };
};
