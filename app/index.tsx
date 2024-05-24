import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Button, Image, StyleSheet, Platform } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import * as AuthSession from 'expo-auth-session';
import { response } from 'express';
import * as Configs from '@/configs'

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 250,
        width: 400,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});

interface SpotifyCredentials {
    cilentID: string,
    clientSecret: string,
    redirectURI: string
}

async function getAuthCode() {

}

export default function Home() {
    try {
        const discovery: AuthSession.DiscoveryDocument = {
            authorizationEndpoint: "https://accounts.spotify.com/authorize",
            tokenEndpoint: "https://accounts.spotify.com/api/token",
        };
        var [req, res, prompt] = AuthSession.useAuthRequest({
            clientId: Configs.clientID,
            redirectUri: Configs.redirectURI,
            usePKCE: false,
            scopes: [
                "user-read-private",
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public",
            ]
        }, discovery);

        if (res?.type === 'success') {
            console.log('success');
        }
    } catch (err) {
        console.log("Error:" + err);
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/spotify-logo.jpg')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.stepContainer}>
                <Button title="Connect to Spotify" onPress={async (event) => {
                    console.log("Connect to Spotify");
                    prompt();
                }
                } />
            </ThemedView>
        </ParallaxScrollView>
    );
}
