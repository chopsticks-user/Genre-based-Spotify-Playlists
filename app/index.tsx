import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Button, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import * as firebase from 'firebase'
import * as AuthSession from 'expo-auth-session';
import * as Configs from '@/configs'
import SplashScreen from '@/components/SplashScreen';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDR-k84V8VE1W6zLtDam4awkoxtsZXYf3c",
  authDomain: "playtify-8bf88.firebaseapp.com",
  projectId: "playtify-8bf88",
  storageBucket: "playtify-8bf88.appspot.com",
  messagingSenderId: "178512786596",
  appId: "1:178512786596:web:b2a46a68aeca2f13542231"
};

const app = initializeApp(firebaseConfig);

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
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
        backgroundColor: '#fff',
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
        width: 35,
        height: 35,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
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
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

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

    if (isLoading) {
        return <SplashScreen onLoadingComplete={handleLoadingComplete} />;
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/applogo.jpg')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.stepContainer}>
                    <TouchableOpacity onPress={() => prompt()} style={styles.connectButton}>
                        <Image source={require('@/assets/images/spotifylogosolo.jpg')} style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Sign in with Spotify</Text>
                    </TouchableOpacity>
                </ThemedView>
            </ParallaxScrollView>
    );
}
