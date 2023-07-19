import {Link, Route} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";

const Error = () => {
    return <div className="grow container flex flex-col justify-center items-center space-y-3">
        <h1 className="text-4xl font-bold">404</h1>
        <p className={"text-xl"}>Page not found</p>
        <Link to={'/'} className={"underline hover:text-slate-950"}>Go home</Link>
    </div>
}

export const errorRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/*',
    component: Error,
})