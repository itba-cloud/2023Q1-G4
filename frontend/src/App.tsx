import './App.css'
import {Outlet, RootRoute} from "@tanstack/router";
import {Navbar} from "@/components/navigation/Navbar.tsx";

// Create a root route
export const rootRoute = new RootRoute({
    component: App,
})

function App() {
    return (
        <div className="flex min-h-screen flex-col items-center space-y-3 overflow-hidden antialiased">
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default App
