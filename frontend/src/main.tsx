import React from 'react'
import ReactDOM from 'react-dom/client'
import {rootRoute} from './App.tsx'
import {Router, RouterProvider} from "@tanstack/router";
import {indexRoute} from "@/Index.tsx";
import {aboutRoute} from "@/About.tsx";
import {dailiesRoute, dailyRoute} from "@/Daily.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Create the route tree using your routes
const routeTree = rootRoute.addChildren(
    [indexRoute, aboutRoute, dailiesRoute.addChildren([dailyRoute])]
)

// Create the router using your route tree
const router = new Router({routeTree})

// Register your router for maximum type safety
declare module '@tanstack/router' {
    interface Register {
        router: typeof router
    }
}

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
