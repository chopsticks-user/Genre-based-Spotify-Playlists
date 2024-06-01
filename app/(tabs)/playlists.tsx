import {
    StyleSheet, Text, View, Image, Button, Pressable, SafeAreaView
} from 'react-native'
import React from 'react'
import { addUserPlaylists, getUserPlaylists, PlaylistDAO, TrackDAO } from '@/database';

const tracks0: TrackDAO[] = [
    { spotifyID: 'track00' },
    { spotifyID: 'track01' },
    { spotifyID: 'track02' },
    { spotifyID: 'track03' },
];

const tracks1: TrackDAO[] = [
    { spotifyID: 'track10' },
    { spotifyID: 'track11' },
    { spotifyID: 'track12' },
    { spotifyID: 'track13' },
];

const playlist0: PlaylistDAO = {
    spotifyID: 'playlist0',
    genres: ['genre0', 'genre1'],
    tracks: tracks0
};

const playlist1: PlaylistDAO = {
    spotifyID: 'playlist1',
    genres: ['genre2'],
    tracks: tracks1
};

export default function Playlists() {
    return (
        <SafeAreaView style={styles.container}>
            <Button title='Test' onPress={async () => {
                try {
                    const id = '122457';
                    await addUserPlaylists(
                        id, [playlist0, playlist1,]
                    );
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