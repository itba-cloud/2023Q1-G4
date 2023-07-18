import {rootRoute} from "@/App.tsx";
import {Route} from "@tanstack/router";
import {cn} from "@/lib/utils.ts";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ErrorField} from "@/components/forms/ErrorField.tsx";
import {useMutation} from "@tanstack/react-query";
import {dailiesApi} from "@/api/dailiesApi.ts";
import {useAuthStore} from "@/hooks/useAuthStore.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {api} from "@/api/api.ts";

interface dailyFormInput {
    yesterday: string
    today: string
    blockers: string
}

const Dailies = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<dailyFormInput>();
    const userEmail = useAuthStore((state) => state.email);
    const teamId = useAuthStore((state) => state.teamId);
    const token = useAuthStore((state) => state.token);

    const {mutate} = useMutation(['daily'], async (data: dailyFormInput) => {
            if (token)
                api.defaults.headers.common['Authorization'] = `${token}`
            await dailiesApi.createDaily({
                yesterday: data.yesterday,
                today: data.today,
                blocker: data.blockers,
                email: userEmail || "",
                _date: new Date(),
                team_id: (teamId || 0) + 1
            })
        }, {
            onError: (error: Error) => {
                toast({
                    title: "Oops! Something went wrong.",
                    description: error.message,
                    variant: "destructive"
                })
            },
            onSuccess: () => {
                toast({
                    title: "Success!",
                    description: "Your daily has been submitted.",
                })
            }
        }
    );

    const handleFormSubmit = (data: dailyFormInput) => {
        console.log(data)
        mutate(data)
    }

    return <div className="m-3 space-y-1.5">
        <h1 className={cn("text-2xl font-bold")}>Fill in the details</h1>
        <form className={"space-y-1.5"} onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={cn("flex flex-col space-y-1.5")}>
                <label htmlFor="yesterday">Yesterday</label>
                <Textarea id="yesterday" {...register("yesterday", {required: true})} className={cn("border-2")}/>
                {errors.yesterday && <ErrorField error={"This field is required"}/>}
            </div>
            <div className={cn("flex flex-col space-y-1.5")}>
                <label htmlFor="today">Today</label>
                <Textarea id="today" {...register("today", {required: true})} className={cn("border-2")}/>
                {errors.today && <ErrorField error={"This field is required"}/>}
            </div>
            <div className={cn("flex flex-col space-y-1.5")}>
                <label htmlFor="blockers">Blockers</label>
                <Textarea id="blockers" {...register("blockers", {required: true})} className={cn("border-2")}/>
                {errors.blockers && <ErrorField error={"This field is required"}/>}
            </div>
            <Button type="submit" className={cn("p-2 rounded")}>Submit</Button>
        </form>
    </div>
}

export const dailiesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'dailies',
    component: Dailies,
})

export const dailyRoute = new Route({
    getParentRoute: () => dailiesRoute,
    path: '$dailyId',
})
