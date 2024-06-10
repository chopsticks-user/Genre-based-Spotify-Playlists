import { ThemeContext, SetThemeContext } from "@/contexts/Theme";
import { useContext } from "react";

export function useTheme() {
    return useContext(ThemeContext);
}

export function useSetTheme() {
    return useContext(SetThemeContext);
}