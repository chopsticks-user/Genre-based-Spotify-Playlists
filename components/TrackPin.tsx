import { addTracks, removeTracks } from "@/database";
import { trackExists } from "@/database/tracks";
import { usePinDimensions } from "@/hooks/usePinDimensions";
import { WebBrowserOpenAction } from "@/hooks/useWebBrowser";
import { ExtractedGenres, Track, addSongsToPlaylist, createUserPlaylist, removeSongsFromPlaylist } from "@/spotify";
import { extractGenresFromTracks } from "@/spotify/genres";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import {
    Pressable, View, StyleSheet, useWindowDimensions, Text,
    ImageBackground,
    TouchableOpacity
} from "react-native";

interface Props extends PropsWithChildren {
    index: number;
    openBrowserAction: WebBrowserOpenAction;
    data: Track;
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

export default function TrackPin(props: Props) {
    const [width, height] = usePinDimensions(styles.itemContainer.margin);
    const duration = getDurationString(props.data.duration_ms);
    const imageURI = props.data.album.images[0].url;

    const [add, setAdd] = useState<boolean>(
        props.data.added === undefined ? false : props.data.added
    );
    const [addLocked, setAddLocked] = useState<boolean>(false);

    const addButtonHandler = () => {
        if (addLocked) {
            return;
        }
        setAddLocked(true);

        let failed = false;
        if (!add) {
            const genresPromise = extractGenresFromTracks([props.data]);
            genresPromise.then(res => {
                const { trackID, genres }: ExtractedGenres = res[0];
                genres.forEach(async genre => {
                    const playlistID = await addTracks(genre, async () => {
                        const playlist = await createUserPlaylist(
                            genre, true, false, 'Created by Playtify'
                        );
                        return playlist.id;
                    }, [{ id: trackID }]);
                    await addSongsToPlaylist(playlistID, [`spotify:track:${trackID}`]);
                });
            }).catch(err => {
                failed = true;
                console.error(err);
            });
        } else {
            const genresPromise = extractGenresFromTracks([props.data]);
            genresPromise.then(res => {
                const { trackID, genres }: ExtractedGenres = res[0];
                console.log(genres);
                genres.forEach(async genre => {
                    try {
                        const playlistID = await removeTracks(genre, [{ id: trackID }]);
                        await removeSongsFromPlaylist(playlistID, [trackID]);
                    } catch (error) {
                        console.error(error);
                    }
                });
            }).catch(err => {
                failed = true;
                console.error(err);
            });
        }

        if (!failed) {
            setAdd(add => !add);
        }

        setTimeout(() => {
            setAddLocked(false);
        }, 1500);
    };

    return (
        <Pressable
            key={props.index}
        >
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
                        onPress={addButtonHandler}
                    >
                        {add ? <Ionicons name="checkmark-circle" size={36} color="green" />
                            : <Ionicons name="add-circle" size={36} color="green" />}
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={async () => {
                            const url = props.data.external_urls?.spotify;
                            if (url !== undefined) {
                                await props.openBrowserAction(url);
                            }
                        }}
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
});