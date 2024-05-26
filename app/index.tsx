import { Button, Image, StyleSheet } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import * as spotify from '@/spotify'
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';

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
    const authSession = useSpotifyAuth();

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
                    await authSession();
                    try {
                        const tracks: spotify.Track[] =
                            await spotify.getUserSavedTracks();
                        const artists: spotify.Artist[] =
                            await spotify.getArtistsFromTracks(tracks);
                        const genres: string[] =
                            await spotify.extractGenresFromArtists(artists);
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
