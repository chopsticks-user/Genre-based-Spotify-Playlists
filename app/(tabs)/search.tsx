import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '@/components/SearchBar';  // Make sure the path is correct
import { SearchQuery, Track, searchTracks } from '@/spotify';
import ScrollablePinCollection from '@/components/ScrollablePinCollection';

export default function Search() {
    const [data, setData] = useState<Track[]>([]);
    const [query, setQuery] = useState<SearchQuery>({ track: '', artist: '', genre: '', minYear: '', maxYear: '' });
    const [searchCriteria, setSearchCriteria] = useState<string[]>([]);
    const [selectedCriteria, setSelectedCriteria] = useState('');

    const handleAddCriteria = useCallback((criteria: any) => {
        if (criteria === 'artist') {
            if (searchCriteria.includes('artist')) {
                setSearchCriteria(searchCriteria.filter(item => item !== 'artist' && item !== 'genre'));
                setQuery(prevQuery => ({ ...prevQuery, artist: '', genre: '' }));
            } else {
                setSearchCriteria([...searchCriteria, 'artist']);
            }
        } else if (criteria === 'genre') {
            if (searchCriteria.includes('genre')) {
                setSearchCriteria(searchCriteria.filter(item => item !== 'genre'));
                setQuery(prevQuery => ({ ...prevQuery, genre: '' }));
            } else if (searchCriteria.includes('artist')) {
                setSearchCriteria([...searchCriteria, 'genre']);
            }
        } else {
            if (searchCriteria.includes(criteria)) {
                setSearchCriteria(searchCriteria.filter(item => item !== criteria));
                setQuery(prevQuery => ({ ...prevQuery, [criteria]: '' }));
            } else {
                setSearchCriteria([...searchCriteria, criteria]);
            }
        }
        setSelectedCriteria('');
    }, [searchCriteria]);

    const handleSearch = useCallback(async () => {
        // Placeholder function to simulate backend search
        // const results = simulateBackendSearch(query);
        const [next, tracks] = await searchTracks(query);
        // 100
        // console.log(tracks[0].artists[0].name);
        // console.log(tracks[0].name);
        setData(tracks);
    }, [query]);

    // const simulateBackendSearch = useCallback((searchQuery: any) => {
    //     // Generate mock data based on the search query and searchBy criteria
    //     return Array.from({ length: Math.floor(Math.random() * 20) + 1 }, (_, i) => ({
    //         id: i.toString(),
    //         name: `${searchQuery.track} Song ${i + 1}`,
    //         artists: [{ name: `${searchQuery.artist} Artist ${i + 1}` }],
    //         album: { release_date: `${1950 + i}` },
    //         genre: `${searchQuery.genre} Genre`,
    //         added: false,
    //     }));
    // }, []);

    // const handleAdd = useCallback((item: any) => {
    //     const newData = data.map(track =>
    //         track.id === item.id ? { ...track, added: !track.added } : track
    //     );
    //     setData(newData);
    // }, [data]);

    // const renderItem = useCallback(({ item, index }: any) => (
    //     <View style={styles.resultItem} key={item.id}>
    //         <Text style={styles.indexText}>{index + 1}</Text>
    //         <Text style={styles.titleText}>{item.name}</Text>
    //         <Text
    //             style={styles.artistText}
    //         >
    //             {item.artists.map((artist: any) => artist.name).join(', ')}
    //         </Text>
    //         <Text style={styles.yearText}>{item.album.release_date.split('-')[0]}</Text>
    //         <TouchableOpacity onPress={() => handleAdd(item)} style={styles.icon}>
    //             <Icon name={item.added ? "checkmark-circle" : "add-circle"} size={24} color="green" />
    //         </TouchableOpacity>
    //     </View>
    // ), [handleAdd]);

    const renderHeader = useCallback(() => (
        <View style={styles.criteriaContainer}>
            <View style={styles.searchByContainer}>
                <Text style={styles.searchByText}>Search by</Text>
                <View style={styles.pickerContainer}>
                    <TouchableOpacity onPress={() => handleAddCriteria('track')} style={styles.criteriaItem}>
                        <View style={styles.checkbox}>
                            {searchCriteria.includes('track') && <Icon name="checkmark" size={16} color="black" />}
                        </View>
                        <Text style={styles.criteriaText}>Track</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={() => handleAddCriteria('artist')} style={styles.criteriaItem}>
                        <View style={styles.checkbox}>
                            {searchCriteria.includes('artist') && <Icon name="checkmark" size={16} color="black" />}
                        </View>
                        <Text style={styles.criteriaText}>Artist</Text>
                    </TouchableOpacity>
                    {searchCriteria.includes('artist') && (
                        <>
                            <TouchableOpacity onPress={() => handleAddCriteria('genre')} style={[styles.criteriaItem, styles.indentedItem]}>
                                <View style={styles.checkbox}>
                                    {searchCriteria.includes('genre') && <Icon name="checkmark" size={16} color="black" />}
                                </View>
                                <Text style={styles.criteriaText}>Genre</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={() => handleAddCriteria('year')} style={styles.criteriaItem}>
                        <View style={styles.checkbox}>
                            {searchCriteria.includes('year') && <Icon name="checkmark" size={16} color="black" />}
                        </View>
                        <Text style={styles.criteriaText}>Year</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {searchCriteria.includes('track') && (
                <SearchBar
                    placeholder="Search by track"
                    value={query.track}
                    onChangeText={(text: any) => setQuery({ ...query, track: text })}
                    onClear={() => setQuery({ ...query, track: '' })}
                />
            )}

            {searchCriteria.includes('artist') && (
                <>
                    <SearchBar
                        placeholder="Search by artist"
                        value={query.artist}
                        onChangeText={(text: any) => setQuery({ ...query, artist: text })}
                        onClear={() => setQuery({ ...query, artist: '' })}
                    />
                    {searchCriteria.includes('genre') && (
                        <SearchBar
                            placeholder="Search by genre"
                            value={query.genre}
                            onChangeText={(text: any) => setQuery({ ...query, genre: text })}
                            onClear={() => setQuery({ ...query, genre: '' })}
                        />
                    )}
                </>
            )}

            {searchCriteria.includes('year') && (
                <View style={styles.yearFieldContainer}>
                    <TextInput
                        style={[styles.input, styles.yearInput]}
                        placeholder="min year"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        onChangeText={(text) => setQuery({ ...query, minYear: text })}
                        value={query.minYear}
                    />
                    <TextInput
                        style={[styles.input, styles.yearInput]}
                        placeholder="max year"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        onChangeText={(text) => setQuery({ ...query, maxYear: text })}
                        value={query.maxYear}
                    />
                </View>
            )}

            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
        </View>
    ), [handleAddCriteria, query, searchCriteria, handleSearch]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {renderHeader()}
                    {/* {data.map((item, index) => (
                        <View key={item.id}>
                            {renderItem({ item, index })}
                        </View>
                    ))} */}
                    <ScrollablePinCollection
                        itemType='track'
                        items={data}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 10,
    },
    criteriaContainer: {
        paddingBottom: 20,
        backgroundColor: '#000000',
    },
    searchByContainer: {
        marginBottom: 10,
    },
    searchByText: {
        color: 'white',
        marginBottom: 5,
    },
    pickerContainer: {
        backgroundColor: '#333',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
    },
    criteriaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    indentedItem: {
        paddingLeft: 30,
    },
    criteriaText: {
        color: 'white',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: 'white',
    },
    input: {
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: '#333',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
    },
    yearFieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    yearInput: {
        width: '48%',
    },
    searchButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        marginVertical: 5,
    },
    indexText: {
        color: 'white',
        width: 30,
    },
    titleText: {
        color: 'white',
        flex: 2,
    },
    artistText: {
        color: 'white',
        flex: 2,
    },
    yearText: {
        color: 'white',
        flex: 1,
    },
    resultsContainer: {
        paddingBottom: 20,
    },
    icon: {
        paddingLeft: 10,
    },
    footerSpace: {
        height: 200,
    },
});
//updating for commit
