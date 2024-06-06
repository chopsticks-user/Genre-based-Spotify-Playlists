import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = React.memo(({ placeholder, value, onChangeText, onClear, keyboardType = 'default' }: any) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="gray"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
            {value ? (
                <TouchableOpacity onPress={onClear} style={styles.iconContainer}>
                    <Icon name="close-circle" size={16} color="white" style={styles.icon} />
                </TouchableOpacity>
            ) : null}
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
        backgroundColor: '#333',
    },
    input: {
        flex: 1,
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: '#333',
    },
    iconContainer: {
        paddingHorizontal: 5,
    },
    icon: {
        backgroundColor: 'transparent',
    },
});

export default SearchBar;
