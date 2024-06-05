import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import TrackPin from '@/components/TrackPin';
import { SimpliedPlaylist, Track } from '@/spotify';
import { useWebBrowser } from '@/hooks/useWebBrowser';

export default function PlaylistDetails() {
    const browserAction = useWebBrowser();

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* <Image
                    source={{ uri: playlist.images[0].url }}
                    style={styles.playlistImage}
                />
                <Text style={styles.title}>{playlist?.name || 'name'}</Text>
                <Text style={styles.description}>{playlist.description}</Text>
                <Text style={styles.genre}>{playlist.genre}</Text>
                <ScrollView contentContainerStyle={styles.tracksContainer}>
                    {tracks.map((track, index) => (
                        <TrackPin
                            key={index}
                            index={index}
                            data={track}
                            openBrowserAction={browserAction} />
                    ))}
                </ScrollView> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    playlistImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    genre: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'gray',
    },
    tracksContainer: {
        marginTop: 20,
    },
});
