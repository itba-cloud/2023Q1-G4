// Create an index route
import { Route, useNavigate } from "@tanstack/router";
import { rootRoute } from "@/App.tsx";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import "../assets/gradient.css"

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
    const navigate = useNavigate({ from: '/' })

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
        <div className="vaporwave-gradient min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 min-h-screen items-center ">
          <div className={cn("shadow-lg p-6 space-y-4 border-2 rounded-2xl dark:bg-black bg-white flex flex-col justify-center items-center h-96")}>
            <h1 className="text-4xl font-bold text-left">
              Are you a PM?
            </h1>
            <Button className="w-fit" onClick={() => handleRedirect('dashboard')}>Dashboard</Button>
          </div>
          <div className={cn("shadow-lg p-6 space-y-4 border-2 rounded-2xl dark:bg-black bg-white flex flex-col justify-center items-center h-96")}>
            <h1 className="text-4xl font-bold text-left">
              Are you a developer?
            </h1>
            <Button className="w-fit" onClick={() => handleRedirect('')}>Dailies</Button>
          </div>
        </div>
      </div>
    </div>
    );
}