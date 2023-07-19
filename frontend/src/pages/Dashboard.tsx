import {useQuery} from "@tanstack/react-query";
import {teamsApi} from "@/api/teamsApi.ts";
import {Suspense} from "react";
import {Spinner} from "@/components/Spinner.tsx";
import {cn} from "@/lib/utils.ts";
import {DisplayDailies} from "@/components/dashboard/DisplayDailies.tsx";
import {Navigate, Route} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {useAuthStore} from "@/hooks/useAuthStore.ts";
import {Role} from "@/types/Interfaces.ts";

const Dashboard: React.FC = () => {
    const {roleId} = useAuthStore(state => ({roleId: state.roleId}));
    const {teamId} = useAuthStore(state => ({teamId: state.teamId}));
    const {data: teamsData} = useQuery(['users'], async () => {
            return await teamsApi.getTeams()
        }
    )

    if (roleId !== Role.PM) {
        return <Navigate from={'/'} to={"/login"}/>
    }

    return (<div className="grow">
            <Suspense fallback={<Spinner/>}>
                {
                    (
                        <div className={cn("p-4")}>
                            <h1 className={cn("font-bold text-left text-2xl")}>
                                {
                                    teamId !== null ? teamsData?.find(team => team.id === teamId + 1)?.name : "No team selected"
                                }
                            </h1>
                            <DisplayDailies/>
                        </div>
                    )
                }
            </Suspense>
        </div>
    )
}

export const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
})