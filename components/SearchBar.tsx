import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = React.memo(({ placeholder, value, onChangeText, onClear }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="gray"
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity onPress={onClear} style={styles.icon}>
                <Icon name="close-circle" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
    },
    input: {
        flex: 1,
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: '#333',
        borderRadius: 5,
    },
    icon: {
        paddingHorizontal: 10,
    },
});

export default SearchBar;

//updating for commit
