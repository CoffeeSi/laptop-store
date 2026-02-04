import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/authApi'

export function useAuth() {
    const setAuth = useAuthStore(state => state.setAuth);
    const clearAuth = useAuthStore(state => state.clearAuth);

    useEffect(() => {
        authApi.getAuthStatus()
            .then(data => {
                if (data) {                    
                    setAuth(data.userID);
                } else {
                    clearAuth();
                }
            })
            .catch(() => {
                clearAuth();
            })
        
    }, [setAuth, clearAuth]);
}