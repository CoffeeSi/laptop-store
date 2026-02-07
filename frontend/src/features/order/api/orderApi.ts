import request from "@/shared/api/request";
import type { IOrder } from "../types/order.types";

export const orderApi = {
    createOrder: async (orderData: IOrder) => {
        const response = await request.post("/orders", orderData);
        return response;
    }, 
    fetchOrders: async (): Promise<IOrder[]> => {
        const response = await request.get("/orders");
        return response.data
    }
}