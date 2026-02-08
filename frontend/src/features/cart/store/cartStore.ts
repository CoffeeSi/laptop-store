import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ILaptop } from '@/features/laptop/types/laptop.types';
import type { IOrderItem } from '@/features/order/types/order.types';

export interface CartItem {
    laptop: ILaptop;
    quantity: number;
}

interface CartState {
    items: Record<string, CartItem>;
    addLaptop: (laptop: ILaptop) => void;
    removeLaptop: (laptop: ILaptop) => void;
    clearCart: () => void;
    getTotalCost: () => number;
    getTotalItems: () => number;
    getOrderItems: () => IOrderItem[];
}

export const useCartStore = create<CartState>()(
    persist<CartState>(
        (set, get) => ({
            items: {},
            addLaptop: (laptop: ILaptop) =>
                set((state) => {
                    const item = state.items[laptop._id];
                    if (!item) {
                        return {
                            items: {
                                ...state.items,
                                [laptop._id]: {
                                    laptop,
                                    quantity: 1
                                }
                            }
                        };
                    }

                    if (item.quantity >= laptop.stock_quantity) {
                        return state;
                    }
                    return {
                        items: {
                            ...state.items,
                            [laptop._id]: {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        }
                    };
                }),
            removeLaptop: (laptop: ILaptop) =>
                set((state) => {
                    const item = state.items[laptop._id];
                    if (!item) return state;

                    const items = { ...state.items };
                    if (item.quantity === 1) {
                        delete items[laptop._id];
                    } else {
                        items[laptop._id] = {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    }

                    return { items };
                }),
            clearCart: () => set({ items: {} }),
            getTotalCost: () => {
                const state = get();
                return Object.values(state.items).reduce(
                    (sum, item) => sum + (item.laptop.price * item.quantity),
                    0
                );
            },
            getOrderItems: () => {
                const state = get()
                const items =  Object.values(state.items).map((item) => ({
                    laptop_id: item.laptop,
                    quantity: item.quantity,
                    unit_price: item.laptop.price
                })
                )
                return items;
            },
            getTotalItems: () => {
                const state = get();
                return Object.values(state.items)
                    .reduce((sum, item) => sum + item.quantity, 0);
            }
        }),
        { name: 'cart-storage' }
    )
)
