import React from 'react'
import ReactDOM from 'react-dom/client'
import {rootRoute} from './App.tsx'
import {Router, RouterProvider} from "@tanstack/router";
import {indexRoute} from "@/Index.tsx";
import {aboutRoute} from "@/About.tsx";

// Create the route tree using your routes
const routeTree = rootRoute.addChildren(
    [indexRoute, aboutRoute]
)

// Create the router using your route tree
const router = new Router({routeTree})

// Register your router for maximum type safety
declare module '@tanstack/router' {
    interface Register {
        router: typeof router
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
