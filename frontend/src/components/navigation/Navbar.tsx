import {Link} from "@tanstack/router";
import {cn} from "@/lib/utils.ts";
import {DarkModeToggle} from "@/components/theme/DarkModeToggle.tsx";
import {useAuthStore} from "@/hooks/useAuthStore.ts";
import {Badge} from "@/components/ui/badge.tsx";

export const Navbar = () => {
    const {roleId} = useAuthStore(state => ({roleId: state.roleId}));

    return (
        <>
            <div className={cn('items-center flex justify-between p-3 border-b-2')}>
                <div className={"flex space-x-1.5 items-center"}>
                    <Link className={"text-3xl"} to="/">🥷</Link>
                    {roleId && <Badge>
                        {roleId}
                    </Badge>}
                </div>

                <div className="flex justify-center space-x-1.5">
                    <p>🌞</p>
                    <DarkModeToggle/>
                    <p>🌚</p>
                </div>
            </div>
        </>
    );
};
