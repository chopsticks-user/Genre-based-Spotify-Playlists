import { StyleSheet, Text, View, Image, Button, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';
import { UserProfile, getUserProfile } from '@/spotify';

export default function Settings() {
    return (
        <SafeAreaView style={styles.container}>
            <Link href='/settings/profile' asChild>
                <Pressable >
                    <Text style={styles.text}>My profile</Text>
                </Pressable>
            </Link>
            <Link href='/settings/recommendations' asChild>
                <Pressable >
                    <Text style={styles.text}>Recommendations</Text>
                </Pressable>
            </Link>
            <Link href='/settings/logout'>
                <Pressable onPress={() => {
                    router.replace('/');
                }}>
                    <Text style={styles.text}>Log out</Text>
                </Pressable>
            </Link>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '500',
    },
});