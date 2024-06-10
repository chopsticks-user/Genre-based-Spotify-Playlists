

export type ThemeName = 'dark' | 'light' | 'native';
export const defaultThemeName: ThemeName = 'dark';

export interface ThemeColors {
    name: ThemeName;
    header: string,
    tab: string;
    screen: string;
    section: string;
    text: string;
    icon: string;
};

export const darkThemeColors: ThemeColors = {
    name: 'dark',
    header: '#000000',
    tab: '#000000',
    screen: '#151718',
    section: '#262626',
    text: '#ecedee',
    icon: '#ffffff',
};

export const lightThemeColors: ThemeColors = {
    name: 'light',
    header: '#ffffff',
    tab: '#ffffff',
    screen: '#e5e7e9',
    section: '#f7f9f9',
    text: '#000000',
    icon: '#000000',
};
