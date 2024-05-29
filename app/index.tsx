import { Button, Image, StyleSheet, View, Text, SafeAreaView, Pressable } from 'react-native'
import * as spotify from '@/spotify'
import { useSpotifyAuth } from '@/hooks';
import { Link, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// TODO: Remove later
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

export default function Auth() {
    const authSession = useSpotifyAuth();
    return (
        <SafeAreaView style={styles.container}>
            <Link replace href="/home" >
                <Pressable style={styles.button}
                    onPress={async () => {
                        const success = await authSession();
                        if (success === true) {
                            router.replace('/home');
                        }
                    }}
                >
                    <Text style={styles.text}>Connect to Spotify</Text>
                </Pressable>
            </Link>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151718',
    },
    text: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '500',
    },
    button: {
        borderRadius: 5,
        borderColor: '#ECEDEE',
    },
});
