import {Route, useNavigate} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {useLogin} from "@/hooks/useCognito.ts";
import {useForm} from "react-hook-form";
import {useAuthStore} from "@/hooks/useAuthStore.ts";
import {shallow} from "zustand/shallow";
import {useEffect} from "react";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {ErrorField} from "@/components/forms/ErrorField.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import { subscribeUserToTeam } from "@/api/subscriptionsApi";
import { useAuthHeaders } from "@/hooks/useAuthHeaders";

interface loginFormInput {
    email: string
    password: string
}

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<loginFormInput>();

    const [login, result, error] = useLogin();
    const {setAccessToken} = useAuthStore(state => ({setAccessToken: state.setAccessToken}), shallow);
    const navigate = useNavigate({from: '/login'});

    useEffect(() => {
        async function validateLogin() {
            if (!result) return;
            
            console.log(result);
            try {
                await subscribeUserToTeam(result.userEmail, result.teamId + 1);
            } catch (e) {
                toast({
                    title: "Error subscribing to team",
                    description: e.message,
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
    }, [result, setAccessToken, navigate])

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

    return <div className={cn('m-2')}>
        <h1 className={cn("text-2xl font-bold")}>Login</h1>
        <form className={"space-y-4 m-8"} onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={cn("flex flex-col space-y-1.5")}>
                <label htmlFor="email">Email</label>
                <Input id="email" {...register("email", {required: true})} className={cn("border-2")}/>
                {errors.email && <ErrorField error={"This field is required"}/>}
            </div>
            <div className={cn("flex flex-col space-y-1.5")}>
                <label htmlFor="password">Password</label>
                <Input type="password" id="password" {...register("password", {required: true})} className={cn("border-2")}/>
                {errors.password && <ErrorField error={"This field is required"}/>}
            </div>
            <Button type="submit" className={cn("p-2 rounded")}>Sign In</Button>
        </form>

    </div>
}

export const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})