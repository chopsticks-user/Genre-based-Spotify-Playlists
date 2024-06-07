import { usePinDimensions } from "@/hooks/usePinDimensions";
import * as WebBrowser from "expo-web-browser";
import { Track, ExtractedGenres, removeSongsFromPlaylist } from "@/spotify";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { PropsWithChildren, useState } from "react";
import {
    Pressable, View, StyleSheet, Text,
    ImageBackground,
    TouchableOpacity
} from "react-native";

// Placeholder function if removeTracks does not exist
const removeTracks = async (genre: string, tracks: { id: string }[]): Promise<string> => {
    console.log(`Removing tracks from genre: ${genre}`);
    return "playlistID";
};

const extractGenresFromTracks = async (tracks: Track[]): Promise<ExtractedGenres[]> => {
    return tracks.map(track => ({
        trackID: track.id,
        genres: ['defaultGenre']
    }));
};

interface Props extends PropsWithChildren {
    index: number;
    data: Track;
    openBrowserAction?: (url: string) => Promise<void>;
}

function getDurationString(duration_ms?: number): string {
    const duration_mins = duration_ms === undefined
        ? 3
        : Math.floor(duration_ms / 60000);
    const duration_secs = duration_ms === undefined
        ? 3
        : Math.round((duration_ms % (duration_mins * 60000)) / 1000);
    return duration_ms === undefined
        ? '?:??'
        : `${duration_mins}:${duration_secs}`;
}

export default function PlaylistTrackPin(props: Props) {
    const [width, height] = usePinDimensions(styles.itemContainer.margin);
    const duration = getDurationString(props.data.duration_ms);
    const imageURI = props.data.album.images[0].url;

    const [removeLocked, setRemoveLocked] = useState<boolean>(false);

    const removeButtonHandler = async () => {
        if (removeLocked) {
            return;
        }
        setRemoveLocked(true);

        let failed = false;

        const genresPromise = extractGenresFromTracks([props.data]);
        genresPromise.then(res => {
            const { trackID, genres }: ExtractedGenres = res[0];
            // console.log(genres);  // Log genres to check

            genres.forEach(async genre => {
                try {
                    const playlistID = await removeTracks(genre, [{ id: trackID }]);
                    console.log(`Removing track: ${trackID} from playlist: ${playlistID}`);  // Log IDs to check
                    await removeSongsFromPlaylist(playlistID, [trackID]);
                } catch (error) {
                    failed = true;
                    console.log(error);
                }
            });
        }).catch(err => {
            failed = true;
            console.log(err);
        });

        if (!failed) {
            // Handle track removal from UI if needed
        }

        setTimeout(() => {
            setRemoveLocked(false);
        }, 1500);
    };

    return (
        <Pressable key={props.index}>
            <ImageBackground source={{ uri: props.data.album.images[0].url }}
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
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={removeButtonHandler}
                        style={styles.iconContainer}
                    >
                        <Ionicons name="remove-circle" size={36} color="green" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={async () => {
                            const url = props.data.external_urls?.spotify;
                            if (url !== undefined) {
                                await WebBrowser.openBrowserAsync(url);
                            }
                        }}
                        style={styles.iconContainer}
                    >
                        <FontAwesome name="spotify" size={36} color="green" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}></View>
                <View
                    style={[
                        styles.textWrapper,
                        {
                            backgroundColor: imageURI === undefined ?
                                styles.itemContainer.backgroundColor : '#000000a0',
                        }
                    ]}
                >
                    <Text style={styles.itemName}>{props.data.name}</Text>
                    <Text style={styles.itemCode}>
                        {props.data.artists.map(artist => {
                            return artist.name;
                        }).reduce((prev, current, index) => {
                            if (index === 0) {
                                return current;
                            }
                            return prev + ' \u25cf ' + current;
                        })}
                    </Text>
                    <Text style={styles.itemCode}>
                        {props.data.album.name + ' \u25cf '
                            + props.data.album.release_date}
                    </Text>
                    <Text style={styles.itemCode}>
                        {'\u25b6 ' + duration}
                    </Text>
                </View>
            </ImageBackground>
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
    },
    textWrapper: {
        padding: 10,
        borderRadius: 10,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        flexWrap: 'wrap',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 13,
        color: '#fff',
        flexWrap: 'wrap',
    },
    iconContainer: {
        //          backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 18,
        padding: 2,
    },
});
