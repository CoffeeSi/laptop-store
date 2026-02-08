import apiClient from '@/shared/api/request';
import type { ICreateLaptopPayload, IAdminLaptop } from '../types/admin.types';

export const adminLaptopApi = {
    getAllLaptops: async (): Promise<IAdminLaptop[]> => {
        const response = await apiClient.get('/laptops');
        return response.data;
    },
    
    createLaptop: async (payload: ICreateLaptopPayload): Promise<IAdminLaptop> => {
        const response = await apiClient.post('/laptops', payload);
        return response.data;
    },
    
    updateStock: async (laptopId: string, stock_quantity: number): Promise<IAdminLaptop> => {
        const response = await apiClient.patch(`/laptops/${laptopId}/stock`, { stock_quantity });
        return response.data;
    },
    
    deleteLaptop: async (laptopId: string): Promise<void> => {
        await apiClient.delete(`/laptops/${laptopId}`);
    }
};
