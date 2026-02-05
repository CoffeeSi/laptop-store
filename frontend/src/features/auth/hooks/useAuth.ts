import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/authApi'

export function useAuth() {
    const setAuth = useAuthStore(state => state.setAuth);
    const clearAuth = useAuthStore(state => state.clearAuth);
    const setLoading = useAuthStore(state => state.setLoading);
    const isLoading = useAuthStore(state => state.isLoading);

    useEffect(() => {
        if (!isLoading) return;
        
        authApi.getAuthStatus()
            .then(data => {
                if (data.isLoggedIn) {                    
                    setAuth(data.userID);
                } else {
                    clearAuth();
                }
            })
            .catch(error => {
                console.error('Auth check failed:', error);
                clearAuth();
            })
            .finally(() => setLoading(false));
        
    }, [isLoading, setAuth, clearAuth, setLoading]);
}