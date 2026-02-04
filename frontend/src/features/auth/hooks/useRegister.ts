import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import type { IRegisterPayload } from '../types/register.types';

export const useRegister = () => {
    const setUser = useAuthStore(state => state.setAuth);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function register(payload: IRegisterPayload) {
        setError(null);
        setLoading(true);

        try {
            const response = await authApi.register(payload);   
            setUser(response.data.userID);
        } catch (err: any) {
            return { success: false, message: err.response?.data?.message || 'Registration failed' };
        } finally {
            setLoading(false);
        }
        return { success: true };
    }
    return { register, error, loading };
};