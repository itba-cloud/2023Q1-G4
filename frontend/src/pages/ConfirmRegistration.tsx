import {Route, useNavigate} from "@tanstack/router";
import {rootRoute} from "@/App.tsx";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {useConfirmRegistration} from "@/hooks/useCognito.ts";
import {useEffect} from "react";
import {toast} from "@/components/ui/use-toast.ts";
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";

interface confirmRegistrationFormInput {
    email: string
    code: number
}

const ConfirmRegistration = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<confirmRegistrationFormInput>();
    const [confirm, result, error] = useConfirmRegistration();
    const navigate = useNavigate({from: '/confirmRegistration'});

    useEffect(() => {
        if (!result) return;
        navigate({to: '/login'}).catch((e: Error) => {
            toast({
                title: "Something went wrong",
                description: e.message,
            });
        });
    }, [navigate, result])

    useEffect(() => {
        if (!error) return;
        toast({
            title: "Error confirming registration",
            description: error.message,
        });
    }, [error])

    function handleRegistration(data: confirmRegistrationFormInput) {
        confirm(data);
    }

    return (
        <div className="m-2 grow container">
            <h1 className="text-2xl font-bold">Please Confirm Registration</h1>
            <form className={cn("space-y-4 m-8")} onSubmit={handleSubmit(handleRegistration)}>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input type="email" id="email" {...register("email", {required: true})}/>
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="code">Code</label>
                    <Input type="number" id="code" {...register("code", {required: true})}/>
                    {errors.code && <span>This field is required</span>}
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export const confirmRegistrationRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/confirmRegistration',
    component: ConfirmRegistration,
})