import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import TrackPin from './TrackPin';
import PlaylistPin from './PlaylistPin';
import { Track } from '@/spotify';
import { useWebBrowser } from '@/hooks/useWebBrowser';
import { PlaylistDAO } from '@/database';

interface Props {
    itemType: 'track' | 'playlist';
    items: Track[] | PlaylistDAO[];
    removePlaylist?: (genre: string) => Promise<void>;
}

export default function ScrollablePinCollection(props: Props) {
    const openBrowserAction = useWebBrowser();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <SafeAreaView style={styles.gridView}>
                {props.items.map((item, index) => {
                    return props.itemType === 'track' ? (
                        <TrackPin
                            key={index}
                            index={index}
                            data={item as Track}
                            openBrowserAction={openBrowserAction}
                        />
                    ) : (
                        <PlaylistPin
                            key={index}
                            index={index}
                            data={item as PlaylistDAO}
                            removeSelf={
                                async () => {
                                    const removeSelf = props?.removePlaylist as
                                        (genre: string) => Promise<void>;
                                    await removeSelf(
                                        (item as PlaylistDAO).genre
                                    );
                                }
                            }
                        />
                    );
                })}
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
