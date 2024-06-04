<<<<<<< HEAD
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import SearchBar from '@/components/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
=======
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '@/components/SearchBar';  // Make sure the path is correct
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778

interface Query {
    track: string;
    artist: string;
    genre: string;
    minYear: string;
    maxYear: string;
};

export default function Search() {
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState<Query>({ track: '', artist: '', genre: '', minYear: '', maxYear: '' });
    const [searchCriteria, setSearchCriteria] = useState<string[]>([]);
    const [selectedCriteria, setSelectedCriteria] = useState('');

<<<<<<< HEAD
    const handleAddCriteria = (criteria: any) => {
        if (criteria === 'artist') {
            if (searchCriteria.includes('artist')) {
                setSearchCriteria(searchCriteria.filter(item => item !== 'artist' && item !== 'genre'));
                setQuery({ ...query, artist: '', genre: '' });
=======
    const handleAddCriteria = useCallback((criteria) => {
        if (criteria === 'artist') {
            if (searchCriteria.includes('artist')) {
                setSearchCriteria(searchCriteria.filter(item => item !== 'artist' && item !== 'genre'));
                setQuery(prevQuery => ({ ...prevQuery, artist: '', genre: '' }));
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
            } else {
                setSearchCriteria([...searchCriteria, 'artist']);
            }
        } else if (criteria === 'genre') {
            if (searchCriteria.includes('genre')) {
                setSearchCriteria(searchCriteria.filter(item => item !== 'genre'));
<<<<<<< HEAD
                setQuery({ ...query, genre: '' });
=======
                setQuery(prevQuery => ({ ...prevQuery, genre: '' }));
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
            } else if (searchCriteria.includes('artist')) {
                setSearchCriteria([...searchCriteria, 'genre']);
            }
        } else {
            if (searchCriteria.includes(criteria)) {
                setSearchCriteria(searchCriteria.filter(item => item !== criteria));
<<<<<<< HEAD
                setQuery({ ...query, [criteria]: '' });
=======
                setQuery(prevQuery => ({ ...prevQuery, [criteria]: '' }));
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
            } else {
                setSearchCriteria([...searchCriteria, criteria]);
            }
        }
        setSelectedCriteria('');
<<<<<<< HEAD
    };

    const handleSearch = () => {
        // Placeholder function to simulate backend search
        const results = simulateBackendSearch(query);
        setData(results);
    };

    const simulateBackendSearch = (searchQuery: any) => {
=======
    }, [searchCriteria]);

    const handleSearch = useCallback(() => {
        // Placeholder function to simulate backend search
        const results = simulateBackendSearch(query);
        setData(results);
    }, [query]);

    const simulateBackendSearch = useCallback((searchQuery) => {
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
        // Generate mock data based on the search query and searchBy criteria
        return Array.from({ length: Math.floor(Math.random() * 20) + 1 }, (_, i) => ({
            id: i.toString(),
            name: `${searchQuery.track} Song ${i + 1}`,
            artists: [{ name: `${searchQuery.artist} Artist ${i + 1}` }],
            album: { release_date: `${1950 + i}` },
            genre: `${searchQuery.genre} Genre`,
            added: false,
        }));
<<<<<<< HEAD
    };

    const handleAdd = (item: any) => {
=======
    }, []);

    const handleAdd = useCallback((item) => {
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
        const newData = data.map(track =>
            track.id === item.id ? { ...track, added: !track.added } : track
        );
        setData(newData);
<<<<<<< HEAD
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View style={styles.resultItem}>
=======
    }, [data]);

    const renderItem = useCallback(({ item, index }) => (
        <View style={styles.resultItem} key={item.id}>
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
            <Text style={styles.indexText}>{index + 1}</Text>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text
                style={styles.artistText}
            >
                {item.artists.map((artist: any) => artist.name).join(', ')}
            </Text>
            <Text style={styles.yearText}>{item.album.release_date.split('-')[0]}</Text>
            <TouchableOpacity onPress={() => handleAdd(item)} style={styles.icon}>
                <Icon name={item.added ? "checkmark-circle" : "add-circle"} size={24} color="green" />
            </TouchableOpacity>
        </View>
<<<<<<< HEAD
    );

    return (
        <SafeAreaView style={styles.container}>
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
                    onSearch={(text: any) => setQuery({ ...query, track: text })}
                    onClear={() => setQuery({ ...query, track: '' })}
                />
            )}

            {searchCriteria.includes('artist') && (
                <>
                    <SearchBar
                        placeholder="Search by artist"
                        onSearch={(text: any) => setQuery({ ...query, artist: text })}
                        onClear={() => setQuery({ ...query, artist: '' })}
                    />
                    {searchCriteria.includes('genre') && (
                        <SearchBar
                            placeholder="Search by genre"
                            onSearch={(text: any) => setQuery({ ...query, genre: text })}
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
                    />
                    <TextInput
                        style={[styles.input, styles.yearInput]}
                        placeholder="max year"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        onChangeText={(text) => setQuery({ ...query, maxYear: text })}
                    />
                </View>
            )}

            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {data.length > 0 && (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </SafeAreaView>
    );
=======
    ), [handleAdd]);

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
                    onChangeText={(text) => setQuery({ ...query, track: text })}
                    onClear={() => setQuery({ ...query, track: '' })}
                />
            )}

            {searchCriteria.includes('artist') && (
                <>
                    <SearchBar
                        placeholder="Search by artist"
                        value={query.artist}
                        onChangeText={(text) => setQuery({ ...query, artist: text })}
                        onClear={() => setQuery({ ...query, artist: '' })}
                    />
                    {searchCriteria.includes('genre') && (
                        <SearchBar
                            placeholder="Search by genre"
                            value={query.genre}
                            onChangeText={(text) => setQuery({ ...query, genre: text })}
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
                    {data.map((item, index) => (
                        <View key={item.id}>
                            {renderItem({ item, index })}
                        </View>
                    ))}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 10,
    },
<<<<<<< HEAD
    searchByContainer: {
        marginVertical: 10,
    },
    searchByText: {
        color: 'white',
        marginBottom: 10,
    },
    pickerContainer: {
        backgroundColor: '#333',
=======
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
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
        borderColor: 'white',
        borderWidth: 1,
    },
    criteriaItem: {
        flexDirection: 'row',
        alignItems: 'center',
<<<<<<< HEAD
        paddingVertical: 10,
        paddingHorizontal: 15,
=======
        padding: 10,
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
    },
    indentedItem: {
        paddingLeft: 30,
    },
<<<<<<< HEAD
    checkbox: {
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    criteriaText: {
        color: 'white',
=======
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
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
    },
    separator: {
        height: 1,
        backgroundColor: 'white',
<<<<<<< HEAD
        marginHorizontal: 15,
    },
    icon: {
        paddingLeft: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
    },
    yearFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    yearInput: {
        flex: 0.5,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
=======
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
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
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
<<<<<<< HEAD
});
=======
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
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
