import {Link} from "@tanstack/router";
import {cn} from "@/lib/utils.ts";
import {DarkModeToggle} from "@/components/theme/DarkModeToggle.tsx";

export const Navbar = () => {
    return (
        <>
            <div className={cn('items-center flex justify-between p-3 border-b-2')}>
                <Link className={"text-3xl"} to="/">🥷</Link>

                <div className="flex justify-center space-x-1.5">
                    <p>🌞</p>
                    <DarkModeToggle/>
                    <p>🌚</p>
                </div>
            </div>
        </>
    );
};
