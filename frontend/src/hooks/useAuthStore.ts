import {create} from "zustand";
import {persist} from "zustand/middleware";
import {api} from "@/api/api.ts";
import {Role} from "@/types/Interfaces.ts";

interface AuthStore {
    token: string | null;
    setAccessToken: (token: string) => void;
    email: string | null;
    setEmail: (loggedUser: string) => void;
    teamId: number | null;
    setTeamId: (teamId: number) => void;
    roleId: Role | null;
    setRoleId: (roleId: Role) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
            token: localStorage.getItem('token') ?? null,
            setAccessToken: (token) => {
                set({token});
                api.defaults.headers.common['Authorization'] = `${token}`;
            },
            email: null,
            setEmail: (email) => set({email}),
            teamId: null,
            setTeamId: (teamId) => set({teamId}),
            roleId: null,
            setRoleId: (roleId) => set({roleId}),
        }), {
            name: 'auth-storage',
        }
    )
);