import {
    StyleSheet, View, Text, Image, TextInput, Button,
    SafeAreaView, ScrollView, FlatList, useWindowDimensions
} from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router';
import { Dimensions } from 'react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: FlatGrid: ']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function Home() {
    const [name, setName] = useState("Name");
    const [description, setDescription] = useState("Description");
    const [uri, setURI] = useState("URI");
    const [playlistID, setPlaylistID] = useState("Playlist ID");

    const { height, width } = useWindowDimensions();
    console.log(width);
    console.log(height);

    const [items, setItems] = React.useState([
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' },
        { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' },
        { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' },
        { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' },
        { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' },
        { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' },
        { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' },
        { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' },
        { name: 'ASBESTOS', code: '#7f8c8d' },
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' },
        { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' },
        { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' },
        { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' },
        { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' },
        { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' },
        { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' },
        { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' },
        { name: 'ASBESTOS', code: '#7f8c8d' },
    ]);

    return (
        <ScrollView>
            <SafeAreaView style={styles.gridView}>
                {items.map((item, index) => {
                    return <View
                        style={[
                            styles.itemContainer,
                            { backgroundColor: item.code }
                        ]}
                        key={index}
                    >
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemCode}>{item.code}</Text>
                    </View>
                })}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
        minWidth: 185,
        maxWidth: 185,
        margin: 5,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
