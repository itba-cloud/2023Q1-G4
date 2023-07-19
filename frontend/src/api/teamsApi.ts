import {api} from "@/api/api.ts";
import {Team} from "@/types/Interfaces.ts";

export const teamsApi = {
    async getTeams(): Promise<Team[]> {
        const res = await api.get('/teams')
        return res.data as Team[];
    }
}