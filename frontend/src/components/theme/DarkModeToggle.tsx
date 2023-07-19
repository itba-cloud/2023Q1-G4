import {useState} from "react";
import useDarkSide from "@/hooks/useDarkSide.ts";
import {Switch} from "@/components/ui/switch.tsx";

export const DarkModeToggle = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light"
    );

    const toggleDarkMode = (checked: boolean) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
            <Switch
                checked={darkSide}
                onCheckedChange={toggleDarkMode}
            >
            </Switch>
        </>
    );
}
