import apiClient from "@/shared/api/request.ts";
import type { ILaptop } from "../types/laptop.types";

export const laptopApi = {
    fetchLaptops: async () => {
        const response = await apiClient.get<ILaptop[]>("/laptops");
        return response.data;
    },
    fetchLaptopById: async (id: string) => {
        if (!id) {
            throw new Error("Laptop ID is required");
        }
        const response = await apiClient.get<ILaptop>(`/laptops/${id}`);        
        return response.data;
    }
}