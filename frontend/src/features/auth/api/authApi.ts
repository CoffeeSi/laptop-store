import apiClient from '@/shared/api/request';
import type { ILoginPayload } from '../types/login.types';
import type { IRegisterPayload } from '../types/register.types';

export const authApi = {
    login: async (credentials: ILoginPayload) => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },
    
    register: async (userData: IRegisterPayload) => {
        const response = await apiClient.post('/auth/register', userData);
        return response;
    },
    
    logout: async () => {
        const response = await apiClient.post('/auth/logout', {}, {withCredentials: true});
        return response.data;
    },

    getAuthStatus: async () => {
        const response = await apiClient.get('/auth/status', {withCredentials: true});        
        return response.data;
    }
};
