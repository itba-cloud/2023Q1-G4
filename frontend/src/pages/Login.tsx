import {Route, useNavigate} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {useLogin} from "@/hooks/useLogin.ts";
import {useForm} from "react-hook-form";
import {useAuthStore} from "@/hooks/useAuthStore.ts";
import {shallow} from "zustand/shallow";
import {useEffect} from "react";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {ErrorField} from "@/components/forms/ErrorField.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "@/components/ui/use-toast.ts";

interface loginFormInput {
    email: string
    password: string
}

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<loginFormInput>();

    const [login, token, loggedUser, error] = useLogin();
    const {setAccessToken, setLoggedUser} = useAuthStore(state => ({setAccessToken: state.setAccessToken, setLoggedUser: state.setLoggedUser}), shallow);
    const navigate = useNavigate({from: '/login'});

    useEffect(() => {
        if (!token || !loggedUser) return;
        setAccessToken(token);
        setLoggedUser(loggedUser);
    }, [token, loggedUser, setAccessToken, setLoggedUser, navigate])

    useEffect(() => {
        if (!error) return;
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });
    }, [error])

    const handleFormSubmit = (data: loginFormInput) => {
        login(data);
    }

    return <div className={cn('m-2')}>
        <form className={"space-y-1.5"} onSubmit={handleSubmit(handleFormSubmit)}>
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