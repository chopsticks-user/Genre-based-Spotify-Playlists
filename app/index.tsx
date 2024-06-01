import { useEffect, useRef, useState } from 'react'
import {
    View, Text, SafeAreaView, Button, Image, StyleSheet,
    TouchableOpacity, Platform, ScrollView, Pressable
} from 'react-native'
import SplashScreen from '@/components/SplashScreen';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import { router } from 'expo-router';

export default function Home() {
    const authSession = useSpotifyAuth();

    const [isLoading, setIsLoading] = useState(true);
    if (isLoading === true) {
        return <SplashScreen onLoadingComplete={() => {
            setIsLoading(false);
        }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Image
                source={require('@/assets/images/playtifylogosolo.jpg')}
                style={[styles.buttonIcon, { backgroundColor: '#ffffff' }]}
            /> */}
            <Pressable onPress={async () => {
                const success = await authSession();
                if (success === true) {
                    router.replace('/home');
                }
            }}
                style={styles.connectButton}>
                <Text style={styles.buttonText}>Sign in with Spotify</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#151718',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    reactLogo: {
        height: 300,
        width: 370,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    connectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#ECEDEE',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300,
    },
    buttonIcon: {
        width: 200,
        height: 100,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});


