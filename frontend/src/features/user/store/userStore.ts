import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../types/user.types";

interface UserState {
    user: IUser;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist<UserState>(
        (set) => ({
            user: {
                _id: null,
                full_name: "",
                email: "",
                phone: "",
                address: "",
                created_at: "",
                role: "",
            },
            setUser: (user: IUser) => set({ user }),
            clearUser: () => set({
                user: {
                    _id: null,
                    full_name: "",
                    email: "",
                    phone: "",
                    address: "",
                    created_at: "",
                    role: "",
                }
            })
        }),
        { name: "user-storage" }
    )
)
