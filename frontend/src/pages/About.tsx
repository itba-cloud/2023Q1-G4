import {rootRoute} from "@/App.tsx";
import {Route} from "@tanstack/router";
import {Suspense} from "react";
import {useQuery} from "@tanstack/react-query";
import {teamsApi} from "@/api/teamsApi.ts";

export const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
})

function About() {
    const teamsQuery = useQuery(['users'], async () => {
            return await teamsApi.getTeams()
        }
    )

    if (teamsQuery.isLoading) return <div>Loading...</div>

    if (teamsQuery.data) {
        console.log(teamsQuery.data)
    }

    return <Suspense>
        Hello from about
    </Suspense>
}
