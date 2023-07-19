import React from 'react'
import ReactDOM from 'react-dom/client'
import {rootRoute} from './App.tsx'
import {Router, RouterProvider} from "@tanstack/router";
import {indexRoute} from "@/pages/Index.tsx";
import {dailiesRoute, dailyRoute} from "@/pages/Daily.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {loginRoute} from "@/pages/Login.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {registerRoute} from "@/pages/Register.tsx";
import {confirmRegistrationRoute} from "@/pages/ConfirmRegistration.tsx";
import {dashboardRoute} from "@/pages/Dashboard.tsx";

// Create the route tree using your routes
const routeTree = rootRoute.addChildren(
    [indexRoute, dailiesRoute.addChildren([dailyRoute]), loginRoute, registerRoute, confirmRegistrationRoute, dashboardRoute]
)

// Create the router using your route tree
export const router = new Router({routeTree})

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
            <Toaster/>
        </QueryClientProvider>
    </React.StrictMode>,
)
