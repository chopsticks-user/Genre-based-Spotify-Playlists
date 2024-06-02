import { usePinDimensions } from "@/hooks/usePinDimensions";
import { WebBrowserOpenAction } from "@/hooks/useWebBrowser";
import { Track } from "@/spotify";
import { PropsWithChildren } from "react";
import {
    Pressable, View, StyleSheet, useWindowDimensions, Text,
    ImageBackground
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
                        minWidth: width,
                        maxWidth: width,
                        minHeight: height,
                        maxHeight: height,
                    }
                ]}
                imageStyle={{ borderRadius: 10 }}
            >
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