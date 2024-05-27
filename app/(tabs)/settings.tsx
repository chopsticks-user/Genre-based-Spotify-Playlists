import { StyleSheet, Text, View, Image } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from 'react'

const Settings = () => {
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
            <Text>Settings</Text>
        </ParallaxScrollView >
    )
}

export default Settings

const styles = StyleSheet.create({})