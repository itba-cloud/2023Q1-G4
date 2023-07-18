import {FC, Suspense} from "react";
import {cn} from "@/lib/utils.ts";
import {useQuery} from "@tanstack/react-query";
import {dailiesApi} from "@/api/dailiesApi.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface DisplayDailiesProps {
    teamId: number
}

export const DisplayDailies: FC<DisplayDailiesProps> = ({teamId}) => {
    const {data: dailies} = useQuery(
        ['dailies', teamId],
        async () => {
            return await dailiesApi.getDailies(teamId)
        });

    return (<Suspense fallback={<Skeleton/>}>
        {dailies?.map((daily) => {
            return (
                <div className={cn("shadow-lg m-3.5 p-2 border-2 rounded-2xl")} key={daily.id}>
                    <div className={cn("flex flex-wrap space-x-1.5 items-baseline")}>
                        <h2 className="font-bold text-left">
                            {
                                daily.email
                            }
                        </h2>
                        <h3 className="text-left text-xs">
                            {
                                daily.date.toString()
                            }
                        </h3>
                    </div>
                    <div className={cn("grid grid-cols-3")}>
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
                        <p className="text-left">
                            {
                                daily.blockers
                            }
                        </p>
                    </div>
                </div>
            )
        })}
    </Suspense>)
}