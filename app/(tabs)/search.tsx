import React, { useState, useCallback, useEffect, createContext, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '@/components/SearchBar';  // Make sure the path is correct
import { SearchQuery, Track, searchTracks } from '@/spotify';
import ScrollablePinCollection from '@/components/ScrollablePinCollection';
import { trackExists } from '@/database/tracks';

export default function Search() {
    const [data, setData] = useState<Track[]>([]);
    const [query, setQuery] = useState<SearchQuery>({ track: '', artist: '', genre: '', minYear: '', maxYear: '' });
    const [searchCriteria, setSearchCriteria] = useState<string[]>([]);
    const [selectedCriteria, setSelectedCriteria] = useState('');
    const [isSearchable, setIsSearchable] = useState(false);

    useEffect(() => {
        setIsSearchable(
            query.track.trim().length > 0 ||
            query.artist.trim().length > 0 ||
            query.genre.trim().length > 0 ||
            query.minYear.trim().length > 0 ||
            query.maxYear.trim().length > 0
        );
    }, [query]);

    const handleAddCriteria = useCallback((criteria: any) => {
        if (criteria === 'artist') {
            if (searchCriteria.includes('artist')) {
                setSearchCriteria(searchCriteria.filter(item => item !== 'artist'));
                setQuery(prevQuery => ({ ...prevQuery, artist: '' }));
            } else {
                setSearchCriteria([...searchCriteria, 'artist']);
            }
        } else if (criteria === 'genre') {
            if (searchCriteria.includes('genre')) {
                setSearchCriteria(searchCriteria.filter(item => item !== 'genre'));
                setQuery(prevQuery => ({ ...prevQuery, genre: '' }));
            } else {
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
        if (isSearchable) {
            setData([]);
            const [next, tracks] = await searchTracks(query);
            const verifiedTracks: Track[] = await Promise.all(tracks.map(async track => {
                track.added = await trackExists(track.id);
                return track;
            }));
            setData(verifiedTracks);
        }
    }, [query, isSearchable]);

    const renderHeader = useCallback(() => (
        <View style={styles.criteriaContainer}>
            <View style={styles.searchByContainer}>
                <Text style={styles.searchByText}>Search by</Text>
                <View style={styles.pickerContainer}>
                    <TouchableOpacity onPress={() => handleAddCriteria('artist')} style={styles.criteriaItem}>
                        <View style={styles.checkbox}>
                            {searchCriteria.includes('artist') && <Icon name="checkmark" size={16} color="black" />}
                        </View>
                        <Text style={styles.criteriaText}>Artist</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={() => handleAddCriteria('genre')} style={[styles.criteriaItem]}>
                        <View style={styles.checkbox}>
                            {searchCriteria.includes('genre') && <Icon name="checkmark" size={16} color="black" />}
                        </View>
                        <Text style={styles.criteriaText}>Genre</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={() => handleAddCriteria('year')} style={styles.criteriaItem}>
                        <View style={styles.checkbox}>
                            {searchCriteria.includes('year') && <Icon name="checkmark" size={16} color="black" />}
                        </View>
                        <Text style={styles.criteriaText}>Year</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SearchBar
                placeholder="Search by track"
                value={query.track}
                onChangeText={(text: any) => setQuery({ ...query, track: text })}
                onClear={() => setQuery({ ...query, track: '' })}
            />

            {searchCriteria.includes('artist') && (
                <SearchBar
                    placeholder="Search by artist"
                    value={query.artist}
                    onChangeText={(text: any) => setQuery({ ...query, artist: text })}
                    onClear={() => setQuery({ ...query, artist: '' })}
                />
            )}

            {searchCriteria.includes('genre') && (
                <SearchBar
                    placeholder="Search by genre"
                    value={query.genre}
                    onChangeText={(text: any) => setQuery({ ...query, genre: text })}
                    onClear={() => setQuery({ ...query, genre: '' })}
                />
            )}

            {searchCriteria.includes('year') && (
                <View style={styles.yearFieldContainer}>
                    <View style={{ ...styles.yearInputWrapper, marginRight: 5 }}>
                        <SearchBar
                            placeholder="min year"
                            value={query.minYear}
                            onChangeText={(text: any) => setQuery({ ...query, minYear: text })}
                            onClear={() => setQuery({ ...query, minYear: '' })}
                            keyboardType="numeric"

                        />
                    </View>
                    <View style={{ ...styles.yearInputWrapper, marginLeft: 5 }}>
                        <SearchBar
                            placeholder="max year"
                            value={query.maxYear}
                            onChangeText={(text: any) => setQuery({ ...query, maxYear: text })}
                            onClear={() => setQuery({ ...query, maxYear: '' })}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            )}

            <TouchableOpacity
                onPress={handleSearch}
                style={[styles.searchButton, !isSearchable && styles.disabledButton]}
                disabled={!isSearchable}
            >
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
        </View>
    ), [handleAddCriteria, query, searchCriteria, handleSearch, isSearchable]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {renderHeader()}
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
        flex: 1,
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: '#333',
        fontSize: 18,
    },
    iconContainer: {
        paddingHorizontal: 5,
    },
    icon: {
        backgroundColor: 'transparent',
    },
    yearFieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    yearInputWrapper: {
        flex: 1,
    },
    yearInput: {
        flex: 1,
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: '#333',
        marginHorizontal: 5,
    },
    searchButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: '#a5d6a7',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
