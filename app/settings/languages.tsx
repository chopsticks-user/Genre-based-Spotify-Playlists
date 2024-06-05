import {
    StyleSheet, Text, View, Pressable, SafeAreaView
} from 'react-native';
import React from 'react';

export default function Languages() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Languages</Text>
            <View style={styles.languageContainer}>
                <Text style={styles.languageText}>English</Text>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Selected</Text>
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
        backgroundColor: '#151718',
        padding: 20,
    },
    title: {
        color: '#ECEDEE',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1E1E1E',
        padding: 15,
        borderRadius: 10,
        width: '80%',
    },
    languageText: {
        color: '#ECEDEE',
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
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
