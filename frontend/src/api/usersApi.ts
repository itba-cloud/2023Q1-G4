import {api} from "@/api/api.ts";
import {User} from "@/types/Interfaces.ts";

export const usersApi = {
    async getUsers(): Promise<User[]> {
        return await api.get("/users");
    },
}