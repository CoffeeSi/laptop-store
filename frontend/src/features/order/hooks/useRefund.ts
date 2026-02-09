import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "../api/orderApi";

export const useRefundItem = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ orderId, laptopId }: { orderId: string; laptopId: string }) => 
            orderApi.refundItem(orderId, laptopId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
}