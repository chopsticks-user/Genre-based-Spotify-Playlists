import {
    StyleSheet, SafeAreaView,
    Pressable, Text,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import ScrollablePinCollection from '@/components/ScrollablePinCollection';
import { ExtractedGenres, Playlist, SearchQuery, SimpliedPlaylist, Track, getUserSavedTracks, prepareSearchExtension, searchTracks } from '@/spotify';
import { router } from 'expo-router';
import { extractGenresFromTracks } from '@/spotify/genres';
import extractedGenresJson from '@/json/extracted-genres.json';
import simplifiedPlaylists from '@/json/simplified-playlists.json';

const playlists: SimpliedPlaylist[] = simplifiedPlaylists;

export default function Playlists() {
    console.log("Playlists");

    const syncWithSpotify = async () => {
        try {
            // const tracks: Track[] = await getUserSavedTracks(); // last updated time
            // const extractedGenres: ExtractedGenres[] =
            //     await extractGenresFromTracks(tracks);

            const q: SearchQuery = {
                track: 'hello',
                artist: '',
                genre: '',
                minYear: '2000',
                maxYear: '2010',
            };
            const [next, tracks]: [number, Track[]] = await searchTracks(q);
            console.log(tracks[0].name);
            console.log(tracks[0].artists[0].name);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPlaylists = async () => {
        try {

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={syncWithSpotify}
                style={styles.connectButton}
            >
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <ScrollablePinCollection itemType='playlist' items={playlists} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    connectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#ECEDEE',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 200,
        height: 50,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});