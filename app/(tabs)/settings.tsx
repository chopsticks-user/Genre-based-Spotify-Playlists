import {
    StyleSheet, Text, View, Image, Button,
    Pressable, SafeAreaView, TouchableOpacity, Switch
} from 'react-native'
import React, { MutableRefObject, useRef, useState } from 'react'
import { Link, router } from 'expo-router';
import { ScrollView } from 'react-native';
import { session } from '@/spotify/sessions';
import { settingsMenuIcons } from '@/constants/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import UserProfileSection from '@/components/UserProfileSection';
import SettingsSection from '@/components/SettingsSection';
import SettingsItemLink from '@/components/SettingsItemLink';
import SettingsItemToggle from '@/components/SettingsItemToggle';
import { useWebBrowser } from '@/hooks/useWebBrowser';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

export default function Settings() {
    const userProfile = session.userProfile;
    const browserOpenAction = useWebBrowser();

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <UserProfileSection profile={userProfile} />
                <SettingsSection header='preferences'>
                    <SettingsItemLink
                        label='Languages'
                        icon={{ element: settingsMenuIcons.languages, color: '#0096ff' }}
                        onPress={() => {
                            router.push('/settings/languages');
                        }}
                    />
                    <SettingsItemToggle
                        label='Themes'
                        icon={{ element: settingsMenuIcons.themes, color: '#0096ff' }}
                    />
                    <SettingsItemLink
                        label='Playlists'
                        icon={{ element: settingsMenuIcons.playlists, color: '#0096ff' }}
                        onPress={() => {
                            router.push('/settings/playlists');
                        }}
                    />
                    <SettingsItemToggle
                        label='Sync'
                        icon={{ element: settingsMenuIcons.sync, color: '#0096ff' }}
                    />
                </SettingsSection>
                <SettingsSection header='help'>
                    <SettingsItemLink
                        label='Report Bugs'
                        icon={{ element: settingsMenuIcons.reportBugs, color: '#989898' }}
                        onPress={() => {
                            router.push('/settings/report-bugs');
                        }}
                    />
                    <SettingsItemLink
                        label='Contact Us'
                        icon={{ element: settingsMenuIcons.reportBugs, color: '#989898' }}
                        onPress={() => {
                            router.push('/settings/contact-us');
                        }}
                    />
                </SettingsSection>
                <SettingsSection header='accounts'>
                    {/* <SettingsItemLink
                        label='Switch Account'
                        icon={{ element: settingsMenuIcons.switchAccount, color: 'orange' }}
                        onPress={async () => {
                        }}
                    /> */}
                    <SettingsItemLink
                        label='Sign Out'
                        icon={{ element: settingsMenuIcons.signOut, color: 'orange' }}
                        onPress={async () => {
                            browserOpenAction('https://accounts.spotify.com/logout');
                            router.replace('/');
                        }}
                    />
                </SettingsSection>
            </SafeAreaView >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 25,
        paddingHorizontal: 15,
    },
    text: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '500',
    },
});