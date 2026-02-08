import { useEffect, useState } from "react"
import type { IOrder } from "../types/order.types"
import { orderApi } from "../api/orderApi";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderApi.fetchOrders();                
                setOrders(data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError(err.message)
                    console.log(err.message)
                }
            }
        }
        fetchOrders();
    }, [setOrders, setError])
    return { orders, error, refetch: () => {
        const fetchOrders = async () => {
            try {
                const data = await orderApi.fetchOrders();                
                setOrders(data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError(err.message)
                }
            }
        }
        fetchOrders();
    }};
}

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