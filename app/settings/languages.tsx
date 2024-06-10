import {
    StyleSheet, Text, View, Pressable, SafeAreaView
} from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function Languages() {
    const theme = useTheme();

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.screen }
            ]}
        >
            <Text style={[styles.title, { color: theme.text }]}>
                Languages
            </Text>
            <View
                style={[
                    styles.languageContainer,
                    { backgroundColor: theme.section }
                ]}
            >
                <Text
                    style={[
                        styles.languageText,
                        { color: theme.text }
                    ]}
                >
                    English
                </Text>
                <Pressable style={styles.button}>
                    <Text
                        style={[
                            styles.buttonText,
                            { color: theme.text }
                        ]}
                    >
                        Selected
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 10,
        width: '80%',
    },
    languageText: {
        fontSize: 18,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
