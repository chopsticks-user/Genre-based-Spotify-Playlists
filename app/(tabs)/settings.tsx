import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from 'react'
import { Link, router } from 'expo-router';

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
            <Link href='/settings/profile' asChild>
                <Pressable>
                    <Text>My profile</Text>
                </Pressable>
            </Link>
            <Link href='/settings/recommendations' asChild>
                <Pressable>
                    <Text>Recommendations</Text>
                </Pressable>
            </Link>
            <Link href='/settings/logout'>
                <Pressable onPress={() => {
                    router.replace('/');
                }}>
                    <Text>Log out</Text>
                </Pressable>
            </Link>
        </ParallaxScrollView >
    )
}

const styles = StyleSheet.create({});