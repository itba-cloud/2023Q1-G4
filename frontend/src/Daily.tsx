import {rootRoute} from "@/App.tsx";
import {Route} from "@tanstack/router";

const Dailies = () => {


    return <>Hello from Dailies!</>
}

export const dailiesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'dailies',
    component: Dailies,
})

// ✅ This path will capture anything in the path after `/dailies` and before the next slash
// eg. `/dailies/123` and `/dailies/123/details will both capture `123`
export const dailyRoute = new Route({
    getParentRoute: () => dailiesRoute,
    path: '$dailyId',
})
