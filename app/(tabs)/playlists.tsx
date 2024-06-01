import {
    StyleSheet, Text, View, Image, Button, Pressable, SafeAreaView
} from 'react-native'
import React from 'react'
import { addUserPlaylists } from '@/database';

export default function Playlists() {
    return (
        <SafeAreaView style={styles.container}>
            <Button title='Test' onPress={async () => {
                try {
                    const id = '122457';
                    await addUserPlaylists(id, ['hehe', { test: 'hehe', num: 2 }]);
                } catch (error) {
                    console.error(error);
                }
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