import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { UserProfile, getUserProfile } from '@/spotify';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function Profile() {
    const userProfile: UserProfile = useUserProfile();

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
            <Text>Country: {userProfile.country}</Text>
            <Text>Display name: {userProfile.display_name}</Text>
            <Text>Email: {userProfile.email}</Text>
            <Text>Spotify URL: {userProfile.external_urls.spotify}</Text>
            <Text>Spotify ID: {userProfile.id}</Text>
        </ParallaxScrollView >
    )
}

const styles = StyleSheet.create({});
