import {api} from "@/api/api.ts";
import {Daily} from "@/types/Interfaces.ts";

export const dailiesApi = {
    async getDailies(teamId: number): Promise<Daily[]> {
        const res = await api.get(`/dailies?team_id=${teamId}`)
        return res.data as Daily[];
    }
}