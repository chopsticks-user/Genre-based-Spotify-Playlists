import { WebBrowserOpenAction } from "@/hooks/useWebBrowser";
import { Track } from "@/spotify";
import { PropsWithChildren } from "react";
import {
    Pressable, View, StyleSheet, useWindowDimensions, Text,
    ImageBackground
} from "react-native";

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 13,
        color: '#fff',
    },
});

interface Props extends PropsWithChildren {
    index: number;
    openBrowserAction: WebBrowserOpenAction;
    data: Track;
}

export default function TrackPin(props: Props) {
    const { height, width } = useWindowDimensions();

    const pinWidth = Math.min(
        width - styles.itemContainer.margin * 2,
        400
    );
    const pinHeight = 200;

    const duration_ms = props.data.duration_ms;
    const duration_mins = duration_ms === undefined
        ? 3
        : Math.floor(duration_ms / 60000);
    const duration_secs = duration_ms === undefined
        ? 3
        : Math.round((duration_ms % (duration_mins * 60000)) / 1000);
    const duration = duration_ms === undefined
        ? '3:00'
        : `${duration_mins}:${duration_secs}`;

    return (
        <Pressable
            key={props.index}
            onPress={async () => {
                const url = props.data.external_urls?.spotify;
                if (url !== undefined) {
                    await props.openBrowserAction(url);
                }
            }}
        >
            <ImageBackground source={{ uri: props.data.album.images[0].url }}
                style={[
                    styles.itemContainer,
                    {
                        backgroundColor: 'blue',
                        minWidth: pinWidth,
                        maxWidth: pinWidth,
                        minHeight: pinHeight,
                        maxHeight: pinHeight,
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
            </ImageBackground>
        </Pressable>
    );
}