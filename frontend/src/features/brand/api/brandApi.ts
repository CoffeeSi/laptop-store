import apiClient from "@/shared/api/request"
import type { IBrand } from "../types/brand.types";

export const brandApi = {
    fetchBrands: async (): Promise<IBrand[]> => {
        const response = await apiClient.get('/brands');
        return response.data
    }
}