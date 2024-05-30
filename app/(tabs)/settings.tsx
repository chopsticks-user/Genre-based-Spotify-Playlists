import {
    StyleSheet, Text, View, Image, Button,
    Pressable, SafeAreaView, TouchableOpacity, Switch
} from 'react-native'
import React, { MutableRefObject, useRef, useState } from 'react'
import { Link, router } from 'expo-router';
import { UserProfile, getUserProfile } from '@/spotify';
import { ScrollView } from 'react-native';
import { session } from '@/spotify/sessions';
import { settingsMenuIcons } from '@/constants/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import UserProfileSection from '@/components/UserProfileSection';
import SettingsSection from '@/components/SettingsSection';

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
                    action: () => {
                        router.push('/settings/languages');
                    }
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
                    action: () => {
                        router.push('/settings/playlists');
                    }
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
                    action: () => {
                        router.push('/settings/report-bugs');
                    }
                },
                {
                    label: 'Contact Us',
                    icon: settingsMenuIcons.contactUs,
                    color: '#989898',
                    type: 'link',
                    action: () => {
                        router.push('/settings/contact-us');
                    }
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
                    action: async () => {
                        try {
                            await AsyncStorage.removeItem('authToken');
                            await AsyncStorage.removeItem('userData');
                            await AsyncStorage.clear();
                            // AuthSession.dismiss();
                            router.replace('/');
                        } catch (error) {
                            console.error('Error clearing app data:', error);
                        }
                    }
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

export default function Settings() {
    const userProfile = session.userProfile;

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <UserProfileSection profile={userProfile} />
                <SettingsSection header='preferences'>
                    {settingsMenu.sections[0].items.map(
                        ({ label, icon, color, type, action }) => {
                            const [value, setValue] = useState(false);

                            return (
                                <TouchableOpacity
                                    key={label}
                                    onPress={async () => {
                                        if (type === 'link' && action !== undefined) {
                                            await action();
                                        }
                                    }}
                                >
                                    <View style={styles.sectionItem}>
                                        <View style={[styles.sectionItemIcon, { backgroundColor: color }]}>
                                            {icon}
                                        </View>
                                        <Text style={styles.sectionItemLabel}>{label}</Text>
                                        <View style={{ flex: 1 }} />
                                        {type === 'toggle' &&
                                            <Switch style={{ alignSelf: 'flex-end' }} value={value} onValueChange={() => setValue(!value)} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                </SettingsSection>
                <SettingsSection header='help'>
                    {settingsMenu.sections[0].items.map(
                        ({ label, icon, color, type, action }) => {
                            const [value, setValue] = useState(false);

                            return (
                                <TouchableOpacity
                                    key={label}
                                    onPress={async () => {
                                        if (type === 'link' && action !== undefined) {
                                            await action();
                                        }
                                    }}
                                >
                                    <View style={styles.sectionItem}>
                                        <View style={[styles.sectionItemIcon, { backgroundColor: color }]}>
                                            {icon}
                                        </View>
                                        <Text style={styles.sectionItemLabel}>{label}</Text>
                                        <View style={{ flex: 1 }} />
                                        {type === 'toggle' &&
                                            <Switch style={{ alignSelf: 'flex-end' }} value={value} onValueChange={() => setValue(!value)} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                </SettingsSection>
                <SettingsSection header='accounts'>
                    {settingsMenu.sections[0].items.map(
                        ({ label, icon, color, type, action }) => {
                            const [value, setValue] = useState(false);

                            return (
                                <TouchableOpacity
                                    key={label}
                                    onPress={async () => {
                                        if (type === 'link' && action !== undefined) {
                                            await action();
                                        }
                                    }}
                                >
                                    <View style={styles.sectionItem}>
                                        <View style={[styles.sectionItemIcon, { backgroundColor: color }]}>
                                            {icon}
                                        </View>
                                        <Text style={styles.sectionItemLabel}>{label}</Text>
                                        <View style={{ flex: 1 }} />
                                        {type === 'toggle' &&
                                            <Switch style={{ alignSelf: 'flex-end' }} value={value} onValueChange={() => setValue(!value)} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                </SettingsSection>
            </SafeAreaView >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 25,
        paddingHorizontal: 15,
    },
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#262626',
        marginVertical: 5,
        height: 40,
        borderRadius: 10,
    },
    sectionItemLabel: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '400',
        marginHorizontal: 10,
    },
    sectionItemIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        height: 30,
        width: 30,
        borderRadius: 10000,
    },
    text: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '500',
    },
});