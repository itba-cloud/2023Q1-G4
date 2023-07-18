// Create an index route
import {Route} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {Suspense} from "react";
import {cn} from "@/lib/utils.ts";
import {DisplayDailies} from "@/components/dashboard/DisplayDailies.tsx";
import {useQuery} from "@tanstack/react-query";
import {teamsApi} from "@/api/teamsApi.ts";
import {Spinner} from "@/components/Spinner.tsx";

export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Index,
})

/*
const DUMMY_USERS: User[] = [
    {
        id: 1234,
        name: 'Miguel OHara',
        email: 'mohara@protonmail.com',
        role: 'Scrum Master',
        team: 'Miguel OHara',
    },
    {
        id: 123456,
        name: 'Gwen Stacy',
        email: 'gstacy@protonmail.com',
        role: 'Programmer',
        team: 'Miguel OHara',
    },
    {
        id: 1234567,
        name: 'Jessica Drew',
        email: 'jdrew@protonmail.com',
        role: 'Programmer',
        team: 'Miguel OHara',
    }
]

const DUMMY_DAILIES: Daily[] = [
    {
        id: 123,
        date: LocalDate.now(),
        user: DUMMY_USERS[0],
        yesterday: 'Yesterday I did some stuff',
        today: 'Today I will do some stuff',
        blockers: 'I have no blockers',
    },
    {
        id: 1234,
        date: LocalDate.now(),
        user: DUMMY_USERS[1],
        yesterday: 'Yesterday I hung out with Miles',
        today: 'Today I won\'t hang out with Miles',
        blockers: 'Yes, Miles is a blocker',
    },
    {
        id: 12345,
        date: LocalDate.now(),
        user: DUMMY_USERS[2],
        yesterday: 'Yesterday I trained with Gwen',
        today: 'Today I will train with Ben',
        blockers: 'I have no blockers',
    }
]*/

function Index() {
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