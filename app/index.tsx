import { Button, Image, StyleSheet, View, Text } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import * as spotify from '@/spotify'
import { useSpotifyAuth } from '@/hooks';
import { Link, router } from 'expo-router';

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

export default function Auth() {
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
                <Link replace href="/home" >
                    <Button title="Connect to Spotify" onPress={async () => {
                        const success = await authSession();
                        if (success === true) {
                            router.replace('/home');
                        }
                    }
                    } />
                </Link>
            </ThemedView>
        </ParallaxScrollView >
    );
}
