import {create} from "zustand";

interface AuthStore {
    token: string | null;
    setAccessToken: (token: string) => void;
    loggedUser: string | null;
    setLoggedUser: (loggedUser: string) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    token: localStorage.getItem('token') || null,
    setAccessToken: (token) => set({token}),
    loggedUser: localStorage.getItem('loggedUser') || null,
    setLoggedUser: (loggedUser) => set({loggedUser}),
}));