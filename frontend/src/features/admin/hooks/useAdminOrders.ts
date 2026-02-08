import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminOrderApi } from '../api/adminOrderApi';
import type { IUpdateOrderStatusPayload } from '../types/admin.types';

export const useAdminOrders = () => {
    return useQuery({
        queryKey: ['admin', 'orders'],
        queryFn: () => adminOrderApi.getAllOrders(),
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ orderId, payload }: { orderId: string; payload: IUpdateOrderStatusPayload }) => 
            adminOrderApi.updateOrderStatus(orderId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
        },
    });
};
