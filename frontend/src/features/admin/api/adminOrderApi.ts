import apiClient from '@/shared/api/request';
import type { IAdminOrder, IUpdateOrderStatusPayload } from '../types/admin.types';

export const adminOrderApi = {
    getAllOrders: async (): Promise<IAdminOrder[]> => {
        const response = await apiClient.get('/orders');
        return response.data;
    },
    
    updateOrderStatus: async (orderId: string, payload: IUpdateOrderStatusPayload): Promise<IAdminOrder> => {
        const response = await apiClient.patch(`/orders/${orderId}/status`, payload);
        return response.data;
    }
};
