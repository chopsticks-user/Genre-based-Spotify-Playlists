import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function Recommendations() {
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
            <Text>Profile</Text>
        </ParallaxScrollView >
    )
}

const styles = StyleSheet.create({});
