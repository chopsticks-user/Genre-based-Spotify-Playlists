import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import ScrollablePinCollection from '@/components/ScrollablePinCollection';
import SearchBar from '@/components/SearchBar';
import { SimpliedPlaylist, Track } from '@/spotify';
import simplifiedPlaylists from '@/json/simplified-playlists.json';
import savedTracks from '@/json/saved-tracks.json'

const initialPlaylists: SimpliedPlaylist[] = simplifiedPlaylists;

export default function Home() {
    const [filteredPlaylists, setFilteredPlaylists] = useState(initialPlaylists);
    const [searchCriteria, setSearchCriteria] = useState<string[]>([]);
    const [nameQuery, setNameQuery] = useState('');
    const [genreQuery, setGenreQuery] = useState('');
    const router = useRouter();

    const handleAddCriteria = useCallback((criteria: string) => {
        if (criteria === 'name') {
            setSearchCriteria(searchCriteria.includes('name') ? searchCriteria.filter(item => item !== 'name') : [...searchCriteria, 'name']);
            setNameQuery('');
        } else if (criteria === 'genre') {
            setSearchCriteria(searchCriteria.includes('genre') ? searchCriteria.filter(item => item !== 'genre') : [...searchCriteria, 'genre']);
            setGenreQuery('');
        }
    }, [searchCriteria]);

    const handleSearch = () => {
        let filtered = initialPlaylists;
        if (searchCriteria.includes('name') && nameQuery) {
            filtered = filtered.filter(playlist =>
                playlist.name.toLowerCase().includes(nameQuery.toLowerCase())
            );
        }
        // if (searchCriteria.includes('genre') && genreQuery) {
        //     filtered = filtered.filter(playlist =>
        //         playlist.genre && playlist.genre.toLowerCase() === genreQuery.toLowerCase()
        //     );
        // }
        setFilteredPlaylists(filtered);
    };

    const handleRefresh = () => {
        setFilteredPlaylists(initialPlaylists);
        setNameQuery('');
        setGenreQuery('');
        setSearchCriteria([]);
    };

    const handlePlaylistPress = (playlist: SimpliedPlaylist) => {
        const tracks: Track[] = [];  // Fetch tracks for the selected playlist
        router.push({ pathname: 'PlaylistDetails', params: { playlist, tracks } as any });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity onPress={() => handleAddCriteria('name')}>
                        <Text style={[styles.dropdownText, searchCriteria.includes('name') && styles.selected]}>Search by Playlist Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAddCriteria('genre')}>
                        <Text style={[styles.dropdownText, searchCriteria.includes('genre') && styles.selected]}>Search by Genre</Text>
                    </TouchableOpacity>
                </View>
                {searchCriteria.includes('name') && (
                    <SearchBar
                        placeholder="Enter playlist name"
                        value={nameQuery}
                        onChangeText={setNameQuery}
                        onClear={() => setNameQuery('')}
                    />
                )}
                {searchCriteria.includes('genre') && (
                    <SearchBar
                        placeholder="Enter genre"
                        value={genreQuery}
                        onChangeText={setGenreQuery}
                        onClear={() => setGenreQuery('')}
                    />
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                        <Text style={styles.buttonText}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                <ScrollablePinCollection
                    itemType='playlist'
                    items={filteredPlaylists}
                    onPressItem={() => handlePlaylistPress}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
        marginHorizontal: 10,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    selected: {
        backgroundColor: '#dcdcdc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    searchButton: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    refreshButton: {
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
