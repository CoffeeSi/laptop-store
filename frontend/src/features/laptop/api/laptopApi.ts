import apiClient from "@/shared/api/request.ts";
import type { ILaptop } from "../types/laptop.types";

export const laptopApi = {
    fetchLaptops: async () => apiClient.get<ILaptop[]>("/laptops"),
}