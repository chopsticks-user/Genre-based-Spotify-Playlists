import { useState } from 'react'
import { View, Text, SafeAreaView, Button, Image, StyleSheet, Platform } from 'react-native'
import { Colors } from '@/constants/Colors'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';

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
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/spotify-logo.jpg')}
                    style={styles.reactLogo}
                />
            }>
            {/* <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave />
            </ThemedView> */}
            <ThemedView style={styles.stepContainer}>
                <Button title="Connect to Spotify" />
            </ThemedView>
        </ParallaxScrollView>
    );
}
