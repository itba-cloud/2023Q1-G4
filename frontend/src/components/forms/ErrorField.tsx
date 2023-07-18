import {cn} from "@/lib/utils.ts";

export const ErrorField = ({error}: { error: string }) => {
    return <span className={cn("text-red-500 text-xs")}>{error}</span>
}