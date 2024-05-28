import { StyleSheet, View, Text, Image, TextInput, Button, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router';

export default function Home() {
    const [name, setName] = useState("Name");
    const [description, setDescription] = useState("Description");
    const [uri, setURI] = useState("URI");
    const [playlistID, setPlaylistID] = useState("Playlist ID");

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Home</Text>
        </SafeAreaView>
    );
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