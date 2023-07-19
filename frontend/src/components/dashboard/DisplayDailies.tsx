import {Suspense} from "react";
import {cn} from "@/lib/utils.ts";
import {useQuery} from "@tanstack/react-query";
import {dailiesApi} from "@/api/dailiesApi.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useAuthHeaders} from "@/hooks/useAuthHeaders.ts";
import {BlockerButton} from "@/components/dashboard/BlockerButton.tsx";
import {useAuthStore} from "@/hooks/useAuthStore.ts";

export const DisplayDailies = () => {
    const {roleId} = useAuthStore(state => ({roleId: state.roleId}));
    const {teamId} = useAuthStore(state => ({teamId: state.teamId}));

    useAuthHeaders();

    const {data: dailies} = useQuery(
        ['dailies', teamId, roleId],
        async () => {
            if (teamId === null) return [];
            return await dailiesApi.getDailies(teamId + 1, roleId)
        });

    return (<Suspense fallback={<Skeleton/>}>
        {
            dailies?.length === 0 ?
                <h1 className={cn("text-xl p-8 text-center")}>🫤 No dailies yet.</h1> :
                dailies?.map((daily) => {
                    return (
                        <div className={cn("shadow-lg m-3.5 p-6 space-y-4 border-2 rounded-2xl")} key={daily.id}>
                            <div className={cn("flex justify-between items-center")}>
                                <div className={cn("flex flex-row space-x-1.5 items-baseline")}>
                                    <h2 className="font-bold text-left">
                                        {
                                            daily.email
                                        }
                                    </h2>
                                    <h3 className="text-left text-xs">
                                        {
                                            // make the _date parameter more beautiful
                                            daily._date.toString().slice(0, 10)
                                        }
                                    </h3>
                                </div>
                                {
                                    daily._date.toString().slice(0, 10) === new Date().toString().slice(0, 10) && <BlockerButton email={daily.email}/>
                                }
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