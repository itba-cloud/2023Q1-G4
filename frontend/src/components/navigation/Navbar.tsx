import {Link} from "@tanstack/router";
import {cn} from "@/lib/utils.ts";
import {DarkModeToggle} from "@/components/theme/DarkModeToggle.tsx";

export const Navbar = () => {
    return (
        <>
            <div className={cn('space-x-1.5 flex justify-between p-3')}>
                <Link className={"text-xl"} to="/">🥷</Link>

                <div className="flex justify-center">
                <p>🌞  .</p>
                <DarkModeToggle/>
                <p>.  🌚</p>
                </div>

                
            </div>
            <hr/>
        </>
    );
};
