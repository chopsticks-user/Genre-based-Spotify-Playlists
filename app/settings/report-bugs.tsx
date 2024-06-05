import {
    StyleSheet, Text, View, Pressable, SafeAreaView, Linking
} from 'react-native';
import React from 'react';

export default function ReportBugs() {
    const handlePress = () => {
        Linking.openURL('https://github.com/chopsticks-user/Playtify/issues');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Issues with the app?</Text>
            <Pressable style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Report bug</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151718',
        padding: 20,
    },
    title: {
        color: '#ECEDEE',
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
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
