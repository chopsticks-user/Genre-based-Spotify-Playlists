import {
    StyleSheet, SafeAreaView,
    Pressable, Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView
} from 'react-native'
import React from 'react'
import ScrollablePinCollection from '@/components/ScrollablePinCollection';
import { SimpliedPlaylist } from '@/spotify';
import simplifiedPlaylists from '@/json/simplified-playlists.json';

const playlists: SimpliedPlaylist[] = simplifiedPlaylists;

export default function Playlists() {
    console.log("Playlists");

    const syncWithSpotify = async () => {
        try {
            // const tracks: Track[] = await getUserSavedTracks(); // last updated time
            // const extractedGenres: ExtractedGenres[] =
            //     await extractGenresFromTracks(tracks);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPlaylists = async () => {
        try {

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    {/* <TextInput value='welcome' /> */}
                    {/* <TextInput value='welcome' /> */}
                    <TouchableOpacity
                        onPress={syncWithSpotify}
                        style={styles.connectButton}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={syncWithSpotify}
                        style={styles.connectButton}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={syncWithSpotify}
                        style={styles.connectButton}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollablePinCollection itemType='playlist' items={playlists} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    connectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#ECEDEE',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 200,
        height: 50,
        margin: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});