import {Link, Route, useNavigate} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {useLogin} from "@/hooks/useCognito.ts";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {ErrorField} from "@/components/forms/ErrorField.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {subscribeUserToTeam} from "@/api/subscriptionsApi";

interface loginFormInput {
    email: string
    password: string
}

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<loginFormInput>();

    const [login, result, error] = useLogin();
    const navigate = useNavigate({from: '/login'});

    useEffect(() => {
        async function validateLogin() {
            if (!result) return;
            try {
                await subscribeUserToTeam(result.userEmail, result.teamId + 1);
            } catch (e) {
                toast({
                    title: "Error subscribing to team",
                    description: e.message as string,
                });
            }
            navigate({to: '/'}).catch((e: Error) => {
                toast({
                    title: "Something went wrong",
                    description: e.message,
                });
            });
        }

        validateLogin();
    }, [result, navigate])

    useEffect(() => {
        if (!error) return;
        toast({
            title: "Error logging in",
            description: error.message,
            variant: "destructive",
        });
    }, [error])

    const handleFormSubmit = (data: loginFormInput) => {
        login(data);
    }

    return <div className={cn('m-2 grow container')}>
        <h1 className={cn("text-2xl font-bold")}>Login</h1>
        <form className={"space-y-4 m-8"} onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={cn("space-y-3.5")}>
                <label htmlFor="email">Email</label>
                <Input id="email" {...register("email", {required: true})} className={cn("border-2")}/>
                {errors.email && <ErrorField error={"This field is required"}/>}
            </div>
            <div className={cn("flex flex-col space-y-1.5")}>
                <label htmlFor="password">Password</label>
                <Input type="password" id="password" {...register("password", {required: true})} className={cn("border-2")}/>
                {errors.password && <ErrorField error={"This field is required"}/>}
            </div>
            <div className="flex space-x-3.5 items-center">
                <Button type="submit" className={cn("p-2 rounded")}>Sign In</Button>
                <Link to={'/register'} className={cn("ml-2 hover:underline")}>Or Register</Link>
            </div>
        </form>
    </div>
}

export const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})