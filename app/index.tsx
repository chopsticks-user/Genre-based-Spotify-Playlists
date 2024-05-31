import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Button, Image, StyleSheet, Platform } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import * as SpotifyAPI from '@/spotifyAPI'
import { getUserSavedTracks } from '@/spotifyAPI/tracks';

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
    const promptAsync: SpotifyAPI.PromptAsync =
        SpotifyAPI.createUserAuthPrompt();

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
                    try {
                        await SpotifyAPI.initializeSession(promptAsync);
                        const tracks: Array<SpotifyAPI.Track> =
                            await getUserSavedTracks();
                        const artists: Array<SpotifyAPI.Artist> =
                            await SpotifyAPI.getArtistsFromTracks(tracks);
                        const genres: Array<string> =
                            await SpotifyAPI.extractGenresFromArtists(artists);
                        console.log(genres);
                    } catch (error) {
                        console.error(error);
                    }
                }
                } />
            </ThemedView>
        </ParallaxScrollView>
    );
}
