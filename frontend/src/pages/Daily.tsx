import {rootRoute} from "@/App.tsx";
import {Route} from "@tanstack/router";
import {cn} from "@/lib/utils.ts";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ErrorField} from "@/components/forms/ErrorField.tsx";

interface dailyFormInput {
    yesterday: string
    today: string
    blockers: string
}

const Dailies = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<dailyFormInput>();

    const handleFormSubmit = (data: dailyFormInput) => {
        console.log(data)
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
