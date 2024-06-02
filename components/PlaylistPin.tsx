import { usePinDimensions } from "@/hooks/usePinDimensions";
import { Playlist, SimpliedPlaylist, Track } from "@/spotify";
import { PropsWithChildren } from "react";
import {
    Pressable, View, StyleSheet, Text,
    ImageBackground
} from "react-native";

interface Props extends PropsWithChildren {
    index: number;
    data: SimpliedPlaylist;
}

export default function PlaylistPin(props: Props) {
    const [width, height] = usePinDimensions(styles.itemContainer.margin);
    const imageURI = props.data.images[0].url;

    return (
        <Pressable
            key={props.index}
            onPress={async () => {
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
                <View
                    style={[
                        styles.textWrapper,
                        {
                            backgroundColor: imageURI === undefined ?
                                styles.itemContainer.backgroundColor : '#000000a0',
                        }]}
                >
                    <Text style={styles.itemName}>{props.data.name}</Text>
                    {/* <Text style={styles.itemCode}>
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
                </Text> */}
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
        textTransform: 'capitalize'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 13,
        color: '#fff',
        flexWrap: 'wrap',
    },
});