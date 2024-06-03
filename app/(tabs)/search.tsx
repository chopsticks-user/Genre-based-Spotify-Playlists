import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import SearchBar from '@/components/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Search() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

    // Placeholder function to simulate backend search
    const simulateBackendSearch = (searchQuery) => {
        // Generate mock data based on the search query
        return Array.from({ length: Math.floor(Math.random() * 20) + 1 }, (_, i) => ({
            id: i.toString(),
            title: `${searchQuery} Song ${i + 1}`,
            artist: `${searchQuery} Artist ${i + 1}`,
            added: false,
        }));
    };

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        if (searchQuery) {
            const results = simulateBackendSearch(searchQuery);
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
            <TouchableOpacity onPress={() => handleAdd(item)} style={styles.icon}>
                <Icon name={item.added ? "checkmark-circle" : "add-circle"} size={24} color="green" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
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
        flex: 1,
    },
    artistText: {
        color: 'white',
        flex: 1,
    },
    icon: {
        paddingLeft: 10,
    },
});
