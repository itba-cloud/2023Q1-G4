import {Route, useNavigate} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {cn} from "@/lib/utils.ts";
import {useForm} from "react-hook-form";
import {useRegister} from "@/hooks/useCognito.ts";
import {useEffect} from "react";
import {toast} from "@/components/ui/use-toast.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ErrorField} from "@/components/forms/ErrorField.tsx";

interface registerFormInput {
    email: string
    password: string
    name: string
    teamId: number
    roleId: number
}

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<registerFormInput>();
    const [registerUser, result, error] = useRegister();
    const navigate = useNavigate({from: '/register'});

    useEffect(() => {
        if (!error) return;
        toast({
            title: "Error registering",
            description: error.message,
        });
    }, [error])

    useEffect(() => {
        if (!result) return;
        console.log(result);
        navigate({to: '/confirmRegistration'}).catch((e: Error) => {
            toast({
                title: "Something went wrong",
                description: e.message,
            });
        });
    }, [navigate, result])

    const handleFormSubmit = (data: registerFormInput) => {
        registerUser(data);
    }

    return (
        <div className={cn("m-2")}>
            <h1 className={cn("text-2xl font-bold")}>Register</h1>
            <form className={"space-y-1.5"} onSubmit={handleSubmit(handleFormSubmit)}>
                <div className={cn("flex flex-col space-y-1.5")}>
                    <label htmlFor="name">Name</label>
                    <Input id="name" {...register("name", {required: true})} className={cn("border-2")}/>
                    {errors.name && <ErrorField error={"This field is required"}/>}
                </div>
                <div className={cn("flex flex-col space-y-1.5")}>
                    <label htmlFor="email">Email</label>
                    <Input id="email" {...register("email", {required: true})} className={cn("border-2")}/>
                    {errors.email && <ErrorField error={"This field is required"}/>}
                </div>
                <div className={cn("flex flex-col space-y-1.5")}>
                    <label htmlFor="password">Password</label>
                    <Input type={"password"} id="password" {...register("password", {required: true})} className={cn("border-2")}/>
                    {errors.password && <ErrorField error={"This is a required field"}/>}
                </div>
                <div className={cn("flex flex-col space-y-1.5")}>
                    <label htmlFor="teamId">Team Id</label>
                    <Input type={"number"} id="teamId" {...register("teamId", {required: true})} className={cn("border-2")}/>
                    {errors.teamId && <ErrorField error={"This is a required field"}/>}
                </div>
                <div className={cn("flex flex-col space-y-1.5")}>
                    <label htmlFor="roleId">Role Id</label>
                    <Input type={"number"} id="roleId" {...register("roleId", {required: true})} className={cn("border-2")}/>
                    {errors.roleId && <ErrorField error={"This is a required field"}/>}
                </div>
                <Button type="submit" className={cn("rounded-md p-2")}>Register</Button>
            </form>
        </div>
    )
}

export const registerRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: Register,
})