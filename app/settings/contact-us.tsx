import { StyleSheet, Text, View, SafeAreaView, Linking, Pressable } from 'react-native';
import React from 'react';
import { useWebBrowser } from '@/hooks/useWebBrowser';
import { useTheme } from '@/hooks/useTheme';

const developers = [
    { name: 'Quang Cap', email: 'qaa2qw@virginia.edu' },
    { name: 'Lauren LaPorta', email: 'asj7gw@virginia.edu' },
    { name: 'Ariana Sanjideh', email: 'dkj6uz@virginia.edu' }
];

export default function ContactUs() {
    const theme = useTheme();

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.screen }
            ]}
        >
            <Text style={[styles.title, { color: theme.text }]}>
                Contact Us
            </Text>
            <Text style={[styles.subtitle]}>
                Developers
            </Text>
            {developers.map((developer, index) => (
                <View
                    key={index}
                    style={[
                        styles.developerContainer,
                        { backgroundColor: theme.section }
                    ]}
                >
                    <Text style={[styles.name, { color: theme.text }]}>
                        {developer.name}
                    </Text>
                    <Pressable onPress={
                        () => Linking.openURL(`mailto:${developer.email}`)
                    }
                    >
                        <Text style={[styles.email, { color: theme.text }]}>
                            {developer.email}
                        </Text>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
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
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
