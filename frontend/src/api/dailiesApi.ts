import {api} from "@/api/api.ts";
import {Daily, DailyToDisplay} from "@/types/Interfaces.ts";

export const dailiesApi = {
    async getDailies(teamId: number): Promise<DailyToDisplay[]> {
        const res = await api.get(`/dailies?team_id=${teamId}`)
        return res.data as DailyToDisplay[];
    },

    async createDaily(daily: Daily): Promise<Daily> {
        const res = await api.post('/dailies', daily);
        return res.data as Daily;
    }
}