import {api} from "@/api/api.ts";
import {Daily, DailyToDisplay, Role} from "@/types/Interfaces.ts";

export const dailiesApi = {
    async getDailies(teamId: number | null, roleId: Role | null): Promise<DailyToDisplay[]> {
        if (roleId === null || teamId === null) return [];
        const res = await api.get(`/dailies?team_id=${teamId}&role_id=${Object.values(Role).indexOf(roleId)}`);
        return res.data as DailyToDisplay[];
    },

    async createDaily(daily: Daily): Promise<Daily> {
        if (daily.role_id === null) throw new Error('Role is not defined');
        const role = Object.values(Role).indexOf(daily.role_id);
        const res = await api.post('/dailies', {
            ...daily,
            role_id: role,
        });
        return res.data as Daily;
    }
}