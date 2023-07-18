import {useAuthStore} from "@/hooks/useAuthStore.ts";
import {api} from "@/api/api.ts";

export const useAuthHeaders = () => {
    const token = useAuthStore((state) => state.token);
    if (token)
        api.defaults.headers.common['Authorization'] = `${token}`;
}