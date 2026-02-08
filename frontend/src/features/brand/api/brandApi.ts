import apiClient from "@/shared/api/request"
import type { IBrand, IBrandStats } from "../types/brand.types";

export const brandApi = {
    fetchBrands: async (): Promise<IBrand[]> => {
        const response = await apiClient.get('/brands');
        return response.data
    },
    fetchBrandById: async (brandId: string): Promise<IBrand> => {
        const response = await apiClient.get(`/brands/${brandId}`);
        return response.data;
    },
    fetchBrandStats: async (brandId: string): Promise<IBrandStats> => {
        const response = await apiClient.get(`/brands/stats/${brandId}`);
        return response.data;
    }
}