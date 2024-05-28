import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Playlist } from '@/spotify/types';
import { createUserPlaylist, addSongsToPlaylist } from '@/spotify/playlists';

export default function Home() {
    const [name, setName] = useState("Name");
    const [description, setDescription] = useState("Description");
    const [uri, setURI] = useState("URI");
    const [playlistID, setPlaylistID] = useState("Playlist ID");

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                // source={require('@/assets/images/spotify-logo.jpg')}
                // style={styles.reactLogo}
                />
            }
        >
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'white', borderWidth: 0, color: '#595959', fontSize: 20, marginHorizontal: 5 }}
                    onChangeText={setName}
                    value={name}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'white', borderWidth: 0, color: '#595959', fontSize: 20, marginHorizontal: 5 }}
                    onChangeText={setDescription}
                    value={description}
                />
                <Button title="Create" onPress={async () => {
                    const newPlaylist: Playlist = await createUserPlaylist(
                        name, true, false, description
                    );
                    console.log(newPlaylist);
                }} />
                <TextInput
                    style={{ height: 40, borderColor: 'white', borderWidth: 0, color: '#595959', fontSize: 20, marginHorizontal: 5 }}
                    onChangeText={setPlaylistID}
                    value={playlistID}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'white', borderWidth: 0, color: '#595959', fontSize: 20, marginHorizontal: 5 }}
                    onChangeText={setURI}
                    value={uri}
                />
                <Button title="Add song" onPress={async () => {
                    const snapshotID: string = await addSongsToPlaylist(
                        playlistID, [uri]);
                    console.log(snapshotID);
                }} />
            </View>
        </ParallaxScrollView >
    );
}

const styles = StyleSheet.create({});