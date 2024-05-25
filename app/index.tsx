import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Button, Image, StyleSheet, Platform } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import * as SpotifyAPI from '@/spotifyAPI'
import * as configs from '@/configs'

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

export default function Home() {
    const userAuthSessionInfo: SpotifyAPI.UserAuthSessionInfo | null =
        SpotifyAPI.createUserAuthSession();

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
                    userAuthSessionInfo?.promptAsync();

                    const accessToken = await SpotifyAPI.getAccessToken(
                        SpotifyAPI.getAuthCode(userAuthSessionInfo));
                    const userID: string = await SpotifyAPI.getUserID(accessToken);

                    const playlists: string = await SpotifyAPI.getUserPlaylists(accessToken);
                    console.log(playlists);
                }
                } />
            </ThemedView>
        </ParallaxScrollView>
    );
}
