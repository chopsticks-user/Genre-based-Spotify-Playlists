import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { usePinDimensions } from "@/hooks/usePinDimensions";
import { SimpliedPlaylist, Track } from "@/spotify";
import {
    Pressable, View, StyleSheet, Text,
    ImageBackground, TouchableOpacity, Modal, TextInput
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import savedTracks from '@/json/saved-tracks.json'

interface Props {
    index: number;
    data: SimpliedPlaylist;
    onPress: any;
}
const sampleTracks: Track[] = savedTracks;

export default function PlaylistPin(props: Props) {
    const [width, height] = usePinDimensions(styles.itemContainer.margin);
    const imageURI = props.data.images[0].url;
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState(props.data.name);
    const [newDescription, setNewDescription] = useState(props.data.description || '');
    const navigation = useNavigation();

    const handleEdit = () => {
        props.data.name = newName;
        props.data.description = newDescription;
        setModalVisible(false);
    };

    return (
        <Pressable
            key={props.index}
            onPress={() => {
                router.push({
                    pathname: '/playlists/details',
                    params: { playlist: props.data, tracks: sampleTracks } as any
                });
            }}
        >
            <ImageBackground
                source={{ uri: imageURI }}
                style={[
                    styles.itemContainer,
                    {
                        minWidth: width,
                        maxWidth: width,
                        minHeight: height,
                        maxHeight: height,
                    }
                ]}
                imageStyle={{ borderRadius: 10 }}
            >
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="pencil" size={12} color="white" style={styles.editIcon} />
                </TouchableOpacity>
                <View
                    style={[
                        styles.textWrapper,
                        {
                            backgroundColor: imageURI === undefined ?
                                styles.itemContainer.backgroundColor : '#000000a0',
                        }]}
                >
                    <Text style={styles.itemName}>{props.data.name}</Text>
                </View>
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Edit Playlist</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="New Playlist Name"
                        value={newName}
                        onChangeText={setNewName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New Playlist Description"
                        value={newDescription}
                        onChangeText={setNewDescription}
                    />
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleEdit}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#262626',
        justifyContent: 'flex-end',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        position: 'relative',
    },
    textWrapper: {
        backgroundColor: '#000000a0',
        padding: 10,
        borderRadius: 10,
    },
    itemName: {
        fontSize: 25,
        color: '#fff',
        fontWeight: '600',
        flexWrap: 'wrap',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 3,
        backgroundColor: 'green',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
    },
    editIcon: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: '80%',
    },
    saveButton: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        marginVertical: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        marginVertical: 10,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
