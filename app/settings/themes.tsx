import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme, useSetTheme } from '@/hooks/useTheme'

export default function Themes() {
    const theme = useTheme();
    const setTheme = useSetTheme();

    return (
        <View style={[styles.itemContainer, { backgroundColor: theme.screen }]}>
            <TouchableOpacity
                onPress={() => {
                    setTheme('dark');
                }}
                style={[styles.button, { backgroundColor: theme.section }]}>
                <Text style={[styles.text, { color: theme.text }]}>
                    Dark theme
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setTheme('light');
                }}
                style={[styles.button, { backgroundColor: theme.section }]}>
                <Text style={[styles.text, { color: theme.text }]}>
                    Light theme
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setTheme('native');
                }}
                style={[styles.button, { backgroundColor: theme.section }]}>
                <Text style={[styles.text, { color: theme.text }]}>
                    Default theme
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 10,
        padding: 10,
        width: 150,
        alignItems: 'center',
    },
    text: {
    }
});