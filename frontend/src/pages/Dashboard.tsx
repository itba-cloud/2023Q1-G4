import {useQuery} from "@tanstack/react-query";
import {teamsApi} from "@/api/teamsApi.ts";
import {Suspense} from "react";
import {Spinner} from "@/components/Spinner.tsx";
import {cn} from "@/lib/utils.ts";
import {DisplayDailies} from "@/components/dashboard/DisplayDailies.tsx";
import {Route} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";

const Dashboard: React.FC = () => {
    const {data: teamsData} = useQuery(['users'], async () => {
            return await teamsApi.getTeams()
        }
    )

    return (
        <Suspense fallback={<Spinner/>}>
            {
                teamsData?.map((team) => {
                    return (
                        <div className={cn("p-4")} key={team.id}>
                            <h1 className={cn("font-bold text-left text-2xl")}>
                                {
                                    team.name
                                }
                            </h1>
                            <DisplayDailies teamId={team.id}/>
                        </div>
                    )
                })
            }
        </Suspense>
    )
}

export const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
})