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
import { removeTracks } from "@/database";
import { extractGenresFromTracks } from "@/spotify";

interface Props extends PropsWithChildren {
    index: number;
    track: Track;
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
    const duration = getDurationString(props.track.duration_ms);
    const imageURI = props.track.album.images[0].url;

    const [removeLocked, setRemoveLocked] = useState<boolean>(false);
    const [removed, setRemoved] = useState<boolean>(false);

    const removeButtonHandler = async () => {
        if (removeLocked) {
            return;
        }
        setRemoveLocked(true);

        try {
            const extractedGenres: ExtractedGenres[] =
                await extractGenresFromTracks([props.track]);
            const { trackID, genres } = extractedGenres[0];
            genres.forEach(async genre => {
                const playlistID = await removeTracks(genre, [{ id: trackID }]);
                await removeSongsFromPlaylist(playlistID, [trackID]);
                // console.log(`Removing track: ${trackID} from playlist: ${playlistID}`);  // Log IDs to check
            });
        }
        catch (error) {
            console.log(error);
        }

        setRemoved(true);
        setTimeout(() => {
            setRemoveLocked(false);
        }, 1500);
    };

    return (
        <Pressable key={props.index}>
            <ImageBackground source={{ uri: props.track.album.images[0].url }}
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
                    {
                        !removed &&
                        <TouchableOpacity
                            onPress={removeButtonHandler}
                            style={styles.iconContainer}
                        >
                            <Ionicons name="remove-circle" size={36} color="green" />
                        </TouchableOpacity>
                    }
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={async () => {
                            const url = props.track.external_urls?.spotify;
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
                    <Text style={styles.itemName}>{props.track.name}</Text>
                    <Text style={styles.itemCode}>
                        {props.track.artists.map(artist => {
                            return artist.name;
                        }).reduce((prev, current, index) => {
                            if (index === 0) {
                                return current;
                            }
                            return prev + ' \u25cf ' + current;
                        })}
                    </Text>
                    <Text style={styles.itemCode}>
                        {props.track.album.name + ' \u25cf '
                            + props.track.album.release_date}
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
