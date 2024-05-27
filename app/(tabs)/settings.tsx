import { StyleSheet, Text, View, Image } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from 'react'
import { Link } from 'expo-router';

export default function Settings() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                // source={require('@/assets/images/spotify-logo.jpg')}
                // style={styles.reactLogo}
                />
            }
        >
            <Link href='/settings/profile'>My Profile</Link>
            <Link href='/settings/recommendations'>Recommendations</Link>
        </ParallaxScrollView >
    )
}

const styles = StyleSheet.create({});