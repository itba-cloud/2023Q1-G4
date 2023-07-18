import {create} from "zustand";
import {persist} from "zustand/middleware";
import {api} from "@/api/api.ts";

interface AuthStore {
    token: string | null;
    setAccessToken: (token: string) => void;
    loggedUser: string | null;
    setLoggedUser: (loggedUser: string) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
            token: localStorage.getItem('token') || null,
            setAccessToken: (token) => {
                set({token});
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            },
            loggedUser: localStorage.getItem('loggedUser') || null,
            setLoggedUser: (loggedUser) => set({loggedUser}),
        }), {
            name: 'auth-storage',
        }
    )
);