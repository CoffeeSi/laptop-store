import { useCartStore } from "@/features/cart/store/cartStore";
import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { IOrderSubmit } from "../types/order.types";

export const useOrder = () => {
    const user_id = useAuthStore((state) => state.userID)

    const orderData = useOrderStore((state) => state.orderData);
    const submitOrder = useOrderStore((state) => state.submitOrder);
    const clearCart = useCartStore((state) => state.clearCart);

    async function createOrder() {
        if (!user_id) {
            throw new Error("User not authenticated");
        }

        const state = useCartStore.getState();
        const orderItems = state.getOrderItems();

        const orderSubmit: IOrderSubmit = {
            items: orderItems,
        } 
        try {
            await submitOrder(orderSubmit);
            clearCart();
        } catch (error) {
            console.error("Failed to create order:", error);
            throw error;
        }
    }

    return {orderData, createOrder};
} 