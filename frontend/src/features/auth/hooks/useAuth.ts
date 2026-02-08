import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/authApi'
import { useUser } from '@/features/user/hooks/useUser';

export function useAuth() {
    const fetchUser = useUser()
    const setAuth = useAuthStore(state => state.setAuth);
    const clearAuth = useAuthStore(state => state.clearAuth);
    const setLoading = useAuthStore(state => state.setLoading);
    const isLoading = useAuthStore(state => state.isLoading);

    useEffect(() => {
        if (!isLoading) return;
        
        authApi.getAuthStatus()
            .then(data => {
                if (data.isLoggedIn) {                    
                    setAuth(data.userID, data.role);
                    fetchUser(data.userID)
                } else {
                    clearAuth();
                }
            })
            .catch(error => {
                console.error('Auth check failed:', error);
                clearAuth();
            })
            .finally(() => setLoading(false));
        
    }, [fetchUser, setAuth, clearAuth, setLoading, isLoading]);
}