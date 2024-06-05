import { WebBrowserOpenAction, useWebBrowser } from "@/hooks/useWebBrowser";
import React, { useContext, useState } from "react";
import { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import TrackPin from "./TrackPin";
import { Playlist, SimpliedPlaylist, Track } from "@/spotify";
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
}

export default function ScrollablePinCollection(props: Props) {
    const openBrowser: WebBrowserOpenAction = useWebBrowser();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <SafeAreaView style={styles.gridView}>
                {props.items.map((item, index) => {
                    return props.itemType === 'track' ?
                        (<TrackPin
                            key={index}
                            index={index}
                            openBrowserAction={openBrowser}
                            data={item as Track}
                        />) :
                        (<PlaylistPin
                            key={index}
                            index={index}
                            data={item as Playlist}
                        />);
                })}
            </SafeAreaView>
        </ScrollView>
    );
}