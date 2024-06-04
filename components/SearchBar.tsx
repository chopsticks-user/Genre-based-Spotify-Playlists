import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ placeholder, onSearch, onClear }) => {
    const [text, setText] = useState('');

    const handleClear = () => {
        setText('');
        onClear();
    };

    const handleSearch = () => {
        onSearch(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="gray"
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity onPress={handleClear} style={styles.icon}>
                <Icon name="close-circle" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearch} style={styles.icon}>
                <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        padding: 10,
    },
    icon: {
        paddingHorizontal: 5,
    },
});

export default SearchBar;
