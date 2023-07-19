import {api} from "@/api/api.ts";
import {BlockerNotification} from "@/types/Interfaces.ts";

interface postNotificationParams extends BlockerNotification {
    team_id: number;
}

export const notificationsApi = {
    async postNotification({subject, message, team_id}: postNotificationParams): Promise<void> {
        return await api.post('/notifications', {
            id: team_id,
            message,
            subject
        });
    }
}