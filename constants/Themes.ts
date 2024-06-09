

export interface ThemeColors {
    type: 'dark' | 'light';
    tab: string;
    screen: string;
    section: string;
    text: string;
    icon?: string;
};

export const darkThemeColors: ThemeColors = {
    type: 'dark',
    tab: '#000000',
    screen: '#151718',
    section: '#262626',
    text: '#ecedee',
};

export const lightThemeColors: ThemeColors = {
    type: 'light',
    tab: '#ffffff',
    screen: '#yellow',
    section: '#gray',
    text: '#000000',
};