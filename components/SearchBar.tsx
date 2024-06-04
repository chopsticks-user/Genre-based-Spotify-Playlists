<<<<<<< HEAD
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

=======
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = React.memo(({ placeholder, value, onChangeText, onClear }) => {
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="gray"
<<<<<<< HEAD
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
=======
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity onPress={onClear} style={styles.icon}>
                <Icon name="close-circle" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
});
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
<<<<<<< HEAD
        padding: 5,
        marginVertical: 10,
=======
        marginVertical: 5,
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
    },
    input: {
        flex: 1,
        color: 'white',
<<<<<<< HEAD
        padding: 10,
    },
    icon: {
        paddingHorizontal: 5,
=======
        paddingHorizontal: 10,
        backgroundColor: '#333',
        borderRadius: 5,
    },
    icon: {
        paddingHorizontal: 10,
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
    },
});

export default SearchBar;
<<<<<<< HEAD
=======

//updating for commit
>>>>>>> 3c1b49bec23685c2d0cc3c11de8c69626b1d0778
