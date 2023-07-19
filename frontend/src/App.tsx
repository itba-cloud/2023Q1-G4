import './App.css'
import {Outlet, RootRoute} from "@tanstack/router";
import {Navbar} from "@/components/navigation/Navbar.tsx";

// Create a root route
export const rootRoute = new RootRoute({
    component: App,
})

function Footer() {
    return <div className={"p-4 border-t-2"}>
        <p className={"text-center text-gray-500"}>
            &copy; 2023 Q1 Cloud Computing • Grupo 4
        </p>
    </div>;
}

function App() {
    return (
        <div className="flex min-h-screen flex-col overflow-hidden antialiased dark:bg-black">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default App
