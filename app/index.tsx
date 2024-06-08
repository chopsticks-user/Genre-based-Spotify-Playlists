import { useCallback, useEffect, useState } from 'react';
import {
    View, Text, Image, StyleSheet,
    Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import { router } from 'expo-router';
import { createUser } from '@/database';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Home() {
    const authSession = useSpotifyAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isLoading) {
            await SplashScreen.hideAsync();
        }
    }, [isLoading]);

    if (!isLoading) {
        return null;
    }

    return (
        <LinearGradient
            colors={['#1DB954', '#191414']}
            style={styles.container}
            onLayout={onLayoutRootView}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/logo-transparent.jpg')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.descriptionText}>
                Create amazing playlists with your favorite songs from Spotify
            </Text>
            <Pressable
                onPress={async () => {
                    try {
                        const success = await authSession();
                        if (success === true) {
                            createUser();
                            const userExisted = await createUser();
                            if (userExisted) {
                                router.replace('/home');
                            } else {
                                router.replace('/welcome');
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }}
                style={styles.connectButton}
            >
                <Text style={styles.buttonText}>Sign in with Spotify</Text>
            </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 230,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 30,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    connectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#1DB954',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 250,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

