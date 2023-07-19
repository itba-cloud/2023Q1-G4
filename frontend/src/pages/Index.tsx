// Create an index route
import {Route, useNavigate} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import "../assets/gradient.css"

export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Index,
})

function Index() {
    const navigate = useNavigate({from: '/'})

    function handleRedirect(to: string) {
        navigate({
            to: to === 'dashboard' ? '/dashboard' : '/dailies',
        }).catch((e: Error) => {
            toast({
                title: "Something went wrong",
                description: e.message,
            })
        })
    }

    return (
        <div className="vaporwave-gradient flex grow items-center justify-center">
            <div className="container grid md:grid-cols-2 md:gap-8 min-h-screen items-center">
                <div className={cn("shadow-lg p-6 space-y-4 border-2 rounded-3xl dark:bg-black bg-white flex flex-col justify-center items-center h-96")}>
                    <h1 className="text-4xl font-bold text-center">
                        Are you a PM?
                    </h1>
                    <Button className="w-fit" onClick={() => handleRedirect('dashboard')}>Dashboard</Button>
                </div>
                <div className={cn("shadow-lg p-6 space-y-4 border-2 rounded-3xl dark:bg-black bg-white flex flex-col justify-center items-center h-96")}>
                    <h1 className="text-4xl font-bold text-center">
                        Are you a developer?
                    </h1>
                    <Button className="w-fit" onClick={() => handleRedirect('')}>Dailies</Button>
                </div>
            </div>
        </div>
    );
}