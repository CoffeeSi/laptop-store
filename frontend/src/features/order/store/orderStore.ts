import { create } from "zustand"
import { persist } from "zustand/middleware";
import type { IOrder, IOrderSubmit } from "../types/order.types";
import { orderApi } from "../api/orderApi";

interface OrderState {
    orderData: IOrder,
    updateOrder: (data: IOrder) => void;
    submitOrder: (data: IOrderSubmit) => Promise<void>;
}

export const useOrderStore = create(
    persist<OrderState>(
        (set, get) => ({
            orderData: ({
                user_id: "",
                items: [],
                total_price: 0,
                status: "pending",
                order_date: new Date()
            }),
            updateOrder: (data: IOrder) => 
                set((state) => ({
                    orderData: { ...state.orderData, ...data}
                })),
            submitOrder: async (data: IOrderSubmit) => {
                get().updateOrder({
                    ...data,
                    status: "pending",
                    order_date: new Date(),
                });
                const order = get().orderData;
                if (order.items.length === 0) {
                    throw new Error("Order is empty");
                }
                const response = await orderApi.createOrder(order)
                if (!response.status || response.status !== 201) {
                    throw new Error("Failed to submit order");
                }
                get().updateOrder({
                    user_id: "",
                    items: [],
                    total_price: 0,
                    status: "pending",
                    order_date: new Date(),
                });
            }
        }), { name: "order-storage" }
    )
)