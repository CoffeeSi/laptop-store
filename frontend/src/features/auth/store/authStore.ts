import { create } from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    userID: string | null;
    setAuth: (userID: string) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
    isLoading: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    userID: null,
    setAuth: (userID) =>
        set(() => ({
            isLoggedIn: true,
            userID,
        })),
    clearAuth: () =>
        set(() => ({
            isLoggedIn: false,
            userID: null,
        })),
    setLoading: (loading: boolean) =>
        set(() => ({
            isLoading: loading
        })),
    isLoading: true,
}))