import { create } from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    userID: string | null;
    setAuth: (userID: string, role: string) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
    isLoading: boolean;
    role: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    userID: null,
    setAuth: (userID, role) =>
        set(() => ({
            isLoggedIn: true,
            role,
            userID,
        })),
    clearAuth: () =>
        set(() => ({
            isLoggedIn: false,
            userID: null,
            role: null,
        })),
    setLoading: (loading: boolean) =>
        set(() => ({
            isLoading: loading
        })),
    isLoading: true,
    role: null,
}))