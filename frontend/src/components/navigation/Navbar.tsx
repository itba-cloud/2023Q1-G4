import {Link} from "@tanstack/router";
import {cn} from "@/lib/utils.ts";

export const Navbar = () => {
    return (
        <div className={cn('space-x-1.5')}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <hr/>
        </div>
    );
};
