import {
    StyleSheet, Text, View, Image, Button, Pressable, SafeAreaView
} from 'react-native'
import React from 'react'
import {
    createUser, removePlaylist,
} from '@/database';
import { addPlaylist, getPlaylists } from '@/database/playlists';

export default function Playlists() {
    const getPlaylistID = async () => 'playlist2';

    return (
        <SafeAreaView style={styles.container}>
            <Button title='Test' onPress={async () => {
                try {
                    await createUser();
                    // await addPlaylist('genre2', getPlaylistID);
                    // console.log(playlists);
                } catch (error) {
                    console.error(error);
                }
            }} />
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