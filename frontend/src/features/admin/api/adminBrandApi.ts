import apiClient from '@/shared/api/request';
import type { ICreateBrandPayload, IAdminBrand } from '../types/admin.types';

export const adminBrandApi = {
    getAllBrands: async (): Promise<IAdminBrand[]> => {
        const response = await apiClient.get('/brands');
        return response.data;
    },
    
    createBrand: async (payload: ICreateBrandPayload): Promise<IAdminBrand> => {
        const response = await apiClient.post('/brands', payload);
        return response.data;
    },
    
    deleteBrand: async (brandId: string): Promise<void> => {
        await apiClient.delete(`/brands/brands/${brandId}`);
    }
};
