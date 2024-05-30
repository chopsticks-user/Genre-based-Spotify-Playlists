import { router } from "expo-router";
import { settingsMenuIcons } from "./Icons"

export interface SettingsButton {
    readonly label: string,
    readonly icon: any,
    readonly color: string,
    readonly type: 'toggle' | 'link',
    readonly action?: any,
};
export interface SettingsSection {
    readonly header: string,
    readonly items: SettingsButton[],
};

export interface SettingsMenu {
    readonly sections: SettingsSection[],
};

export const settingsMenu: SettingsMenu = {
    sections: [
        {
            header: 'preferences',
            items: [
                {
                    label: 'Languages',
                    icon: settingsMenuIcons.languages,
                    color: '#0096FF',
                    type: 'link',
                },
                {
                    label: 'Themes',
                    icon: settingsMenuIcons.themes,
                    color: '#0096FF',
                    type: 'toggle',
                },
                {
                    label: 'Playlists',
                    icon: settingsMenuIcons.playlists,
                    color: '#0096FF',
                    type: 'link',
                },
                {
                    label: 'Sync',
                    icon: settingsMenuIcons.sync,
                    color: '#0096FF',
                    type: 'toggle',
                },
            ]
        },
        {
            header: 'help',
            items: [
                {
                    label: 'Report Bugs',
                    icon: settingsMenuIcons.reportBugs,
                    color: '#989898',
                    type: 'link',
                },
                {
                    label: 'Contact Us',
                    icon: settingsMenuIcons.contactUs,
                    color: '#989898',
                    type: 'link',
                },
            ]
        },
        {
            header: 'accounts',
            items: [
                {
                    label: 'Switch Account',
                    icon: settingsMenuIcons.switchAccount,
                    color: 'orange',
                    type: 'link',
                },
                {
                    label: 'Sign Out',
                    icon: settingsMenuIcons.signOut,
                    color: 'orange',
                    type: 'link',
                    action: () => { router.replace('/') },
                },
            ]
        },
    ]
};