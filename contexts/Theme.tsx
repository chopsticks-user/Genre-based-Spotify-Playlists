import { ThemeColors, darkThemeColors, lightThemeColors } from "@/constants/Themes";
import { PropsWithChildren, createContext, useReducer } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<ThemeColors | null>(null);
export const ThemeDispatchContext = createContext<any | null>(null);

type ThemeAction = { type: 'dark' } | { type: 'light' } | { type: 'none' };

function themeReducer(theme: ThemeColors, themeAction: ThemeAction) {
    switch (themeAction.type) {
        case 'dark': return darkThemeColors;
        case 'light': return lightThemeColors;
        case 'none': {
            return themeReducer(theme, { type: useColorScheme() || 'dark' });
        }
    }
}

export function ThemeContextProvider({ children }: PropsWithChildren) {
    const [theme, themeDispatch] = useReducer(
        themeReducer, darkThemeColors
    );

    return (
        <ThemeContext.Provider value={theme}>
            <ThemeDispatchContext.Provider value={themeDispatch}>
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeContext.Provider>
    );
}