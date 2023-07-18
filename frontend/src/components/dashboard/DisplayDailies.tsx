import {FC, Suspense} from "react";
import {cn} from "@/lib/utils.ts";
import {useQuery} from "@tanstack/react-query";
import {dailiesApi} from "@/api/dailiesApi.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useAuthHeaders} from "@/hooks/useAuthHeaders.ts";

interface DisplayDailiesProps {
    teamId: number
}

export const DisplayDailies: FC<DisplayDailiesProps> = ({teamId}) => {
    useAuthHeaders();
    const {data: dailies, isLoading} = useQuery(
        ['dailies', teamId],
        async () => {
            return await dailiesApi.getDailies(teamId)
        });

    if (isLoading) {
        return <Skeleton/>
    }

    return (<Suspense fallback={<Skeleton/>}>
        {
            dailies?.length === 0 ? <h1 className={cn("text-xl p-8 text-center")}>🫤 No dailies yet.</h1> :
                dailies?.map((daily) => {
                    return (
                        <div className={cn("shadow-lg m-3.5 p-6 space-y-4 border-2 rounded-2xl")} key={daily.id}>
                            <div className={cn("flex flex-wrap space-x-1.5 items-baseline")}>
                                <h2 className="font-bold text-left">
                                    {
                                        daily.email
                                    }
                                </h2>
                                <h3 className="text-left text-xs">
                                    {
                                        // use daily._date as dd-mm-yyyy
                                        daily._date.toString()
                                    }
                                </h3>
                            </div>
                            <div className={cn("grid grid-cols-3 gap-3")}>
                                <p className="text-left">
                                    {
                                        daily.yesterday
                                    }
                                </p>
                                <p className="text-left">
                                    {
                                        daily.today
                                    }
                                </p>
                                <p className="text-left text-red-500 dark:text-red-300">
                                    {
                                        daily.blocker
                                    }
                                </p>
                            </div>
                        </div>
                    )
                })}
    </Suspense>)
}