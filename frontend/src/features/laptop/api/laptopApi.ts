import apiClient from "@/shared/api/request.ts";
import type { ILaptop, ILaptopsResponse } from "../types/laptop.types";
import type { IFilters } from "../types/filters.types";

export const laptopApi = {
    fetchLaptops: async (filters: URLSearchParams) => {        
        const response = await apiClient.get<ILaptopsResponse>(`/laptops?${filters.toString()}`);
        return response.data;
    }, 
    fetchLaptopById: async (id: string) => {
        if (!id) {
            throw new Error("Laptop ID is required");
        }
        const response = await apiClient.get<ILaptop>(`/laptops/id/${id}`);        
        return response.data;
    },
    fetchFilters: async () => {
        const response = await apiClient.get<IFilters>('/laptops/filterParams');
        return response.data;
    }
}