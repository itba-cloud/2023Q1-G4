import {rootRoute} from "@/App.tsx";
import {Route} from "@tanstack/router";

export const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
})

function About() {
    return <>Hello from About!</>
}
