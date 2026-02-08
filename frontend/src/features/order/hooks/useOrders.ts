import { useEffect, useState } from "react"
import type { IOrder } from "../types/order.types"
import { orderApi } from "../api/orderApi";
import { AxiosError } from "axios";

export const useOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderApi.fetchOrdersByUserID();                
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
                const data = await orderApi.fetchOrdersByUserID();                
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