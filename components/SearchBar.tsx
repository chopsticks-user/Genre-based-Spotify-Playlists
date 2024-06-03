import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleClear = () => {
        setSearchText('');
        onSearch('');
    };

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for tracks"
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.icon}>
                    <Icon name="close" size={20} color="#999" />
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleSearch} style={styles.icon}>
                <Icon name="search" size={20} color="#999" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    searchInput: {
        color: "#FFFFFF",
        flex: 1,
    },
    icon: {
        padding: 5,
    },
});
