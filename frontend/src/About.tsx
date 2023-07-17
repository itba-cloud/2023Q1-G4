import {rootRoute} from "@/App.tsx";
import {Route} from "@tanstack/router";
import {Suspense} from "react";
import {useQuery} from "@tanstack/react-query";
import {usersApi} from "@/api/usersApi.ts";

export const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
})

function About() {
    const usersQuery = useQuery(['users'], async () => {
            return await usersApi.getUsers();
        }
    )

    return <Suspense>
        {
            usersQuery.data?.map((user) => {
                    return <div key={user.id}>
                        {user.email}
                    </div>
                }
            )
        }
    </Suspense>
}
