import {
    StyleSheet, Text, View, Image, Button, Pressable, SafeAreaView
} from 'react-native'
import React from 'react'
import ScrollablePinCollection from '@/components/ScrollablePinCollection';

export default function Library() {
    return (
        <SafeAreaView>
            <ScrollablePinCollection />
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         color: '#ECEDEE',
//         fontSize: 15,
//         fontWeight: '500',
//     },
// });