import { WebBrowserOpenAction, useWebBrowser } from "@/hooks/useWebBrowser";
import React, { useContext, useState } from "react";
import { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { SimpliedPlaylist, Track } from "@/spotify";
import TrackPin from "./TrackPin";
import PlaylistPin from "./PlaylistPin";

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});

interface Props {
    itemType: 'track' | 'playlist';
    items: Track[] | SimpliedPlaylist[];
    onPressItem?: (item: SimpliedPlaylist | Track) => void;
}

export default function ScrollablePinCollection({ itemType, items, onPressItem }: Props) {
    const browserAction = useWebBrowser();

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <SafeAreaView style={styles.gridView}>
                {items.map((item, index) => (
                    itemType === 'track' ? (
                        <TrackPin
                            key={index}
                            index={index}
                            data={item as Track}
                            openBrowserAction={browserAction}
                        />
                    ) : (
                        <PlaylistPin
                            key={index}
                            index={index}
                            data={item as SimpliedPlaylist}
                            onPress={() => onPressItem && onPressItem(item as SimpliedPlaylist)}
                        />
                    )
                ))}
            </SafeAreaView>
        </ScrollView>
    );
}
