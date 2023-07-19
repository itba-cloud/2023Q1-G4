import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useForm} from "react-hook-form";
import {ErrorField} from "@/components/forms/ErrorField.tsx";
import {BlockerNotification} from "@/types/Interfaces.ts";
import {useAuthStore} from "@/hooks/useAuthStore.ts";
import {notificationsApi} from "@/api/notificationsApi.ts";
import {useMutation} from "@tanstack/react-query";
import {FC} from "react";
import {toast} from "@/components/ui/use-toast.ts";

interface BlockerButtonProps {
    email: string
}

export const BlockerButton: FC<BlockerButtonProps> = ({email}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<BlockerNotification>();
    const {team_id} = useAuthStore(state => ({team_id: state.teamId}));

    const {mutate} = useMutation(['blocker'], async (data: BlockerNotification) => {
            return await notificationsApi.postNotification({
                team_id: (team_id || 1),
                message: data.message,
                subject: data.subject
            })
        },
        {
            onError: (error: Error) => {
                toast({
                    title: "Oops! Something went wrong.",
                    description: error.message,
                })
            },
            onSuccess: () => {
                toast({
                    title: "Success!",
                    description: "Your team has been notified.",
                })
            }
        })

    return (<Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Notify Team</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>
                    Help
                </DialogTitle>
                <DialogDescription>
                    This will send an email notification to the whole team.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit((data) => {
                mutate(data)
            })}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="subject" className="text-right">
                            Subject
                        </label>
                        <Input value={`${email} needs help`} id="subject" className="col-span-3" {...register("subject", {required: true})}/>
                        {
                            errors.subject && <ErrorField error={"This field is required"}/>
                        }
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="message" className="text-right">
                            Message
                        </label>
                        <Textarea id="message" className="col-span-3" {...register("message", {required: true})}/>
                        {
                            errors.subject && <ErrorField error={"This field is required"}/>
                        }
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        Send
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>)
}