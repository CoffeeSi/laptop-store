import request from "@/shared/api/request";
import type { IOrder } from "../types/order.types";

export const orderApi = {
    createOrder: async (orderData: IOrder) => {
        const response = await request.post("/orders", orderData);
        return response;
    }, 
    fetchOrdersByUserID: async (): Promise<IOrder[]> => {
        const response = await request.get("/orders");
        return response.data
    },
    refundItem: async (orderId: string, laptopId: string): Promise<IOrder> => {
        const response = await request.patch(`/orders/${orderId}/refund`, { laptop_id: laptopId });
        return response.data;
    }
}