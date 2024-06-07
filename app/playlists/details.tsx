import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SimpliedPlaylist, Track } from '@/spotify';
import PlaylistTrackPin from '@/components/PlaylistTrackPin';
import { useWebBrowser } from '@/hooks/useWebBrowser';

export default function Details() {
    const { playlist, tracks = '[]' } = useLocalSearchParams<{ playlist: string, tracks: string }>();

    const parsedPlaylist: SimpliedPlaylist = JSON.parse(playlist as string);
    const parsedTracks: Track[] = JSON.parse(tracks);

    useEffect(() => {
        // console.log('Playlist:', JSON.stringify(parsedPlaylist, null, 2));
        // console.log('Tracks:', JSON.stringify(parsedTracks, null, 2));
    }, [parsedPlaylist, parsedTracks]);

    const cleanDescription = (description: string) => {
        if (!description) return '';
        let cleanedDescription = description.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
        cleanedDescription = cleanedDescription.replace(/Curated by.*?(?=\.)\./, ""); // Remove "Curated by" section
        cleanedDescription = cleanedDescription.replace(/Photography by.*?(?=\.)\./, ""); // Remove "Photography by" section
        return cleanedDescription;
    };

    const description = cleanDescription(parsedPlaylist.description as string);

    const imageURI = parsedPlaylist.images.length > 0
        ? parsedPlaylist.images[0].url
        : 'https://via.placeholder.com/640x640.png?text=Playlist+Image'; // Replace with your generic image URL

    if (!parsedPlaylist) {
        return <Text>Loading...</Text>;
    }

    const openBrowserAction = useWebBrowser();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={{ uri: imageURI }} style={styles.playlistImage} />
            <Text style={styles.title}>{parsedPlaylist.name}</Text>
            {description ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            <Text style={styles.genre}>Genre: { }</Text>
            <View style={styles.tracksContainer}>
                {parsedTracks.map((track, index) => (
                    <PlaylistTrackPin
                        key={index}
                        index={index}
                        data={track}
                        openBrowserAction={openBrowserAction}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        backgroundColor: '#151718',
    },
    playlistImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: 'lightgrey',
        marginBottom: 10,
    },
    genre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    tracksContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
