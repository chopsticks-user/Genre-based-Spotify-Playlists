import {
    StyleSheet, Text, View, Image, Button, Pressable, SafeAreaView
} from 'react-native'
import React from 'react'
import { firebaseConfig } from '@/configs';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getName } from '@/database';

export default function Playlists() {
    return (
        <SafeAreaView style={styles.container}>
            <Button title='Read' onPress={async () => {
                getName();
            }} />
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