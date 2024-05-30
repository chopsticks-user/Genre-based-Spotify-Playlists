import {
    StyleSheet, Text, View, Image, Button,
    Pressable, SafeAreaView, TouchableOpacity, Switch
} from 'react-native'
import React, { MutableRefObject, useRef, useState } from 'react'
import { Link, router } from 'expo-router';
import { UserProfile, getUserProfile } from '@/spotify';
import { ScrollView } from 'react-native';
import { useUserProfile } from '@/hooks';
import { session } from '@/spotify/sessions';
import { settingsMenuIcons } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import UserProfileSection from '@/components/UserProfileSection';

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

/* <Link href='/settings/profile' asChild>
                    <Pressable >
                        <Text style={styles.text}>My profile</Text>
                    </Pressable>
                </Link>
                <Link href='/settings/recommendations' asChild>
                    <Pressable >
                        <Text style={styles.text}>Recommendations</Text>
                    </Pressable>
                </Link>
                <Link href='/settings/logout'>
                    <Pressable onPress={() => {
                        router.replace('/');
                    }}>
                        <Text style={styles.text}>Log out</Text>
                    </Pressable>
                </Link> */
/* <View style={styles.profileEditButton}>
                                <FontAwesome6 name="feather-pointed" size={15} color="black" />
                            </View> */

export default function Settings() {
    const userProfile = session.userProfile;

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <UserProfileSection profile={userProfile} />
                {settingsMenu.sections.map(({ header, items }) => {
                    return (
                        <View key={header} style={styles.section}>
                            <Text style={styles.sectionHeader}>{header}</Text>
                            <View style={styles.sectionItemWrapper}>
                                {items.map(({ label, icon, color, type, action }) => {
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
                            </View>
                        </View>
                    );
                })}
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
    section: {
        paddingHorizontal: 10,
    },
    sectionHeader: {
        paddingTop: 25,
        paddingBottom: 20,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    sectionItemWrapper: {
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
    // profile: {
    //     flex: 1,
    //     padding: 0,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // profileAvatar: {
    //     width: 72,
    //     height: 72,
    //     borderRadius: 10000,
    //     borderWidth: 2,
    //     borderColor: '#ECEDEE',
    //     backgroundColor: 'yellow',
    // },
    // profileAvatarWrapper: {
    //     position: 'relative',
    // },
    // profileEditButton: {
    //     width: 20,
    //     height: 20,
    //     borderRadius: 10000,
    //     backgroundColor: 'pink',
    //     top: -15,
    //     left: 45,
    // },
    // profileName: {
    //     textAlign: 'center',
    //     marginTop: 20,
    //     fontSize: 19,
    //     fontWeight: '600',
    //     color: '#ECEDEE',
    // },
    // profileEmail: {
    //     textAlign: 'center',
    //     marginTop: 5,
    //     fontSize: 16,
    //     color: '#ECEDEE',
    // },
    text: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '500',
    },
});