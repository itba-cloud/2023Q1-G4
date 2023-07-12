// Create an index route
import {Route} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Index,
})

function Index() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <Button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </Button>
        </>
    )
}