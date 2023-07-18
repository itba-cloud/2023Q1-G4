import {create} from "zustand";
import {persist} from "zustand/middleware";
import {api} from "@/api/api.ts";

interface AuthStore {
    token: string | null;
    setAccessToken: (token: string) => void;
    email: string | null;
    setEmail: (loggedUser: string) => void;
    teamId: number | null;
    setTeamId: (teamId: number) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
            token: localStorage.getItem('token') || null,
            setAccessToken: (token) => {
                set({token});
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            },
            email: null,
            setEmail: (email) => set({email}),
            teamId: null,
            setTeamId: (teamId) => set({teamId}),
        }), {
            name: 'auth-storage',
        }
    )
);