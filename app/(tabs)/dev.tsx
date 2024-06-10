import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme, useSetTheme } from '@/hooks/useTheme'
import { ThemeContextProvider } from '@/contexts/Theme'

export default function Dev() {
    const theme = useTheme();
    const setTheme = useSetTheme();

    console.log(theme.name);

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => {
                    setTheme('dark');
                }}
                style={styles.button}>
                <Text style={styles.text}>Dark theme</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setTheme('light');
                }}
                style={styles.button}>
                <Text style={styles.text}>Light theme</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setTheme('native');
                }}
                style={styles.button}>
                <Text style={styles.text}>Default theme</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'gray',
        margin: 10,
        padding: 10,
        width: 150,
        alignItems: 'center',
    },
    text: {
        color: '#ecedee',
    }
})
