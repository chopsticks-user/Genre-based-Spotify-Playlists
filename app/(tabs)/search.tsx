import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import SearchBar from '@/components/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

export default function Search() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [searchBy, setSearchBy] = useState('track'); // Default search by track

    // Placeholder function to simulate backend search
    const simulateBackendSearch = (searchQuery, searchBy) => {
        const years = Array.from({ length: 75 }, (_, i) => (1950 + i).toString()); // Years from 1950 to 2024
        const tracks = Array.from({ length: 100 }, (_, i) => ({
            id: i.toString(),
            title: `Song ${i + 1}`,
            artist: `Artist ${i + 1}`,
            year: years[Math.floor(Math.random() * years.length)],
            added: false,
        }));

        return tracks.filter(track => {
            if (searchBy === 'track') {
                return track.title.toLowerCase().includes(searchQuery.toLowerCase());
            } else if (searchBy === 'artist') {
                return track.artist.toLowerCase().includes(searchQuery.toLowerCase());
            } else if (searchBy === 'year') {
                return track.year === searchQuery;
            }
            return false;
        });
    };

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        if (searchQuery) {
            const results = simulateBackendSearch(searchQuery, searchBy);
            setData(results);
        } else {
            setData([]);
        }
    };

    const handleAdd = (item) => {
        const newData = data.map(track =>
            track.id === item.id ? { ...track, added: !track.added } : track
        );
        setData(newData);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.resultItem}>
            <Text style={styles.indexText}>{index + 1}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.artistText}>{item.artist}</Text>
            <Text style={styles.yearText}>{item.year}</Text>
            <TouchableOpacity onPress={() => handleAdd(item)} style={styles.icon}>
                <Icon name={item.added ? "checkmark-circle" : "add-circle"} size={24} color="green" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchByContainer}>
                <Text style={styles.searchByText}>Search by</Text>
                <Picker
                    selectedValue={searchBy}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSearchBy(itemValue)}
                >
                    <Picker.Item label="Track" value="track" />
                    <Picker.Item label="Artist" value="artist" />
                    <Picker.Item label="Year" value="year" />
                </Picker>
            </View>
            <SearchBar onSearch={handleSearch} />
            {query.length > 0 && (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 10,
    },
    searchByContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    searchByText: {
        color: 'white',
        marginRight: 10,
    },
    picker: {
        flex: 1,
        color: 'white',
        backgroundColor: '#333',
        borderColor: 'white',
        borderWidth: 1,
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
    icon: {
        paddingLeft: 10,
    },
});
