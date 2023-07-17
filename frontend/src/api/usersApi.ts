import {api} from "@/api/api.ts";

interface User {
    id: number;
    email: string;
}

export const usersApi = {
    async getUsers(): Promise<User[]> {
        return await api.get("/users");
    },
    async postUser(): Promise<void> {
        return await api.post("/users", {
            email: "cloud-g4@protonmail.com"
        });
    }
}