import {
    StyleSheet, Text, Pressable, SafeAreaView,
} from 'react-native';
import React from 'react';
import { useWebBrowser } from '@/hooks/useWebBrowser';
import { useTheme } from '@/hooks/useTheme';

export default function ReportBugs() {
    const theme = useTheme();
    const browserOpenAction = useWebBrowser();

    const handlePress = () => {
        browserOpenAction('https://github.com/chopsticks-user/Playtify/issues')
    };

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: theme.screen }
        ]}
        >
            <Text style={[styles.title, { color: theme.text }]}>
                Issues with the app?
            </Text>
            <Pressable style={styles.button} onPress={handlePress}>
                <Text
                    style={[
                        styles.buttonText,
                        { color: theme.text }
                    ]}
                >
                    Report bug
                </Text>
            </Pressable>
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
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
