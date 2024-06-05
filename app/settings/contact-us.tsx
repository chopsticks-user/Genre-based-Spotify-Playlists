import { StyleSheet, Text, View, SafeAreaView, Linking, Pressable } from 'react-native';
import React from 'react';

const developers = [
    { name: 'Quang Cap', email: 'qaa2qw@virginia.edu' },
    {name: 'Lauren LaPorta', email: 'asj7gw@virginia.edu' },
    {name: 'Ariana Sanjideh', email: 'dkj6uz@virginia.edu' }
];

export default function ContactUs() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.subtitle}>Developers</Text>
            {developers.map((developer, index) => (
                <View key={index} style={styles.developerContainer}>
                    <Text style={styles.name}>{developer.name}</Text>
                    <Pressable onPress={() => Linking.openURL(`mailto:${developer.email}`)}>
                        <Text style={styles.email}>{developer.email}</Text>
                    </Pressable>
                </View>
            ))}
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ECEDEE',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#4CAF50',
        marginBottom: 15,
    },
    developerContainer: {
        marginBottom: 15,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        width: '80%',
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ECEDEE',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#1E90FF',
        textDecorationLine: 'underline',
    },
});
