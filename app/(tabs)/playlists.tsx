import React, { useState, useCallback, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import ScrollablePinCollection from '@/components/ScrollablePinCollection';
import SearchBar from '@/components/SearchBar';
import { PlaylistDAO, getPlaylists, removePlaylist } from '@/database';
import { unfollowPlaylist } from '@/spotify';

export default function Playlists() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [playlists, setPlaylists] = useState<PlaylistDAO[]>([]);

    const loadAllPlaylists = useCallback(async () => {
        setIsLoading(true);

        try {
            const fetchedlaylists = await getPlaylists();
            setPlaylists(fetchedlaylists);
            setFilteredPlaylists(fetchedlaylists);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }, []);

    const removePlaylistFuncParam = async (genre: string) => {
        setIsLoading(true);

        try {
            const playlistID: string | null = await removePlaylist(genre);
            if (playlistID === null) {
                return;
            }

            //* Does not work as expected
            // await unfollowPlaylist(playlistID);

            const newPlaylists = playlists.splice(
                playlists.findIndex(playlist => playlist.genre === genre)
            );
            setPlaylists(newPlaylists);

            const newFilteredPlaylists = filteredPlaylists.splice(
                filteredPlaylists.findIndex(playlist => playlist.genre === genre)
            );
            setFilteredPlaylists(newFilteredPlaylists);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        loadAllPlaylists().then(res => { }).catch(error => console.log(error));
    }, []);

    useEffect(() => {
    }, [playlists]);

    const [filteredPlaylists, setFilteredPlaylists] =
        useState<PlaylistDAO[]>(playlists);
    const [searchCriteria, setSearchCriteria] = useState<string[]>([]);
    const [nameQuery, setNameQuery] = useState('');
    const [genreQuery, setGenreQuery] = useState('');
    const [isSearchable, setIsSearchable] = useState(false);

    useEffect(() => {
        setIsSearchable(
            (searchCriteria.includes('name') && nameQuery.trim().length > 0) ||
            (searchCriteria.includes('genre') && genreQuery.trim().length > 0)
        );
    }, [nameQuery, genreQuery, searchCriteria]);

    const handleAddCriteria = useCallback((criteria: string) => {
        if (criteria === 'name') {
            setSearchCriteria(searchCriteria.includes('name')
                ? searchCriteria.filter(item => item !== 'name')
                : ['name']);
            setNameQuery('');
        } else if (criteria === 'genre') {
            setSearchCriteria(searchCriteria.includes('genre')
                ? searchCriteria.filter(item => item !== 'genre')
                : ['genre']);
            setGenreQuery('');
        }
    }, [searchCriteria]);

    const handleSearch = () => {
        if (isSearchable) {
            let filtered = playlists;
            if (searchCriteria.includes('name') && nameQuery) {
                filtered = filtered.filter(playlist =>
                    playlist.name.toLowerCase().includes(nameQuery.toLowerCase())
                );
            } else if (searchCriteria.includes('genre') && genreQuery) {
                filtered = filtered.filter(playlist =>
                    playlist.genre.toLowerCase().includes(genreQuery.toLowerCase())
                );
            }
            setFilteredPlaylists(filtered);
        }
    };

    const handleRefresh = () => {
        setFilteredPlaylists(playlists);
        setNameQuery('');
        setGenreQuery('');
        setSearchCriteria([]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity onPress={() => handleAddCriteria('name')}>
                        <Text style={[
                            styles.dropdownText, searchCriteria.includes('name')
                            && styles.selected
                        ]}
                        >
                            Search by Playlist Name
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAddCriteria('genre')}>
                        <Text
                            style={[
                                styles.dropdownText, searchCriteria.includes('genre')
                                && styles.selected
                            ]}
                        >
                            Search by Genre
                        </Text>
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
                    <TouchableOpacity
                        onPress={handleSearch}
                        style={[styles.searchButton, !isSearchable && styles.disabledButton]}
                        disabled={!isSearchable}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleRefresh}
                        style={[styles.refreshButton]}
                    >
                        <Text style={styles.buttonText}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                <ScrollablePinCollection
                    itemType='playlist'
                    items={filteredPlaylists}
                    removePlaylist={removePlaylistFuncParam}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151718',
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
    disabledButton: {
        backgroundColor: '#a5d6a7',
    },
    disabledRefreshButton: {
        backgroundColor: '#bdbdbd',
    },
});
