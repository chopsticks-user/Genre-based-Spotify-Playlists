import { StyleSheet, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { UserProfile } from '@/spotify';
import { Link } from 'expo-router';
import { useWebBrowser, useUserProfile, WebBrowserOpenAction } from '@/hooks';

export default function Profile() {
    const userProfile: UserProfile = useUserProfile();
    const webBrowserOpenAction: WebBrowserOpenAction = useWebBrowser();

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image />
            }>
            <Text>Country: {userProfile.country}</Text>
            <Text>Display name: {userProfile.display_name}</Text>
            <Text>Email: {userProfile.email}</Text>
            <Text>{"Spotify URL: "}
                {<Link href={userProfile.external_urls.spotify}>
                    <Pressable onPress={async () => {
                        await webBrowserOpenAction(userProfile.external_urls.spotify)
                    }}>
                        <Text>{userProfile.external_urls.spotify}</Text>
                    </Pressable>
                </Link>}
            </Text>
            <Text>Spotify ID: {userProfile.id}</Text>
        </ParallaxScrollView >
    );
}

const styles = StyleSheet.create({});
