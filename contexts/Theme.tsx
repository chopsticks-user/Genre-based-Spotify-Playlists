import { ThemeColors, ThemeName, darkThemeColors, defaultThemeName, lightThemeColors } from "@/constants/Themes";
import { PropsWithChildren, createContext, useReducer, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

export const ThemeContext = createContext<ThemeColors>(darkThemeColors);
export const SetThemeContext = createContext((themeName: ThemeName) => { });

function fromNativeTheme(nativeTheme: ColorSchemeName): ThemeName {
    if (nativeTheme === null || nativeTheme === undefined) {
        return defaultThemeName;
    }
    return nativeTheme;
}

export function ThemeContextProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<ThemeColors>(darkThemeColors);
    const nativeTheme = useColorScheme();

    function setThemeByName(themeName: ThemeName): void {
        switch (themeName) {
            case 'dark': return setTheme(darkThemeColors);
            case 'light': return setTheme(lightThemeColors);
            case 'native': return setThemeByName(fromNativeTheme(nativeTheme));
        }
    }

    return (
        <ThemeContext.Provider value={theme}>
            <SetThemeContext.Provider value={setThemeByName}>
                {children}
            </SetThemeContext.Provider>
        </ThemeContext.Provider>
    );
}