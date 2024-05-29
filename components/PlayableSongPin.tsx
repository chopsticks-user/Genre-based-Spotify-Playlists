import { WebBrowserOpenAction } from "@/hooks";
import { PropsWithChildren } from "react";
import { Pressable, View, StyleSheet, useWindowDimensions, Text } from "react-native";

// 

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
        minWidth: 185,
        maxWidth: 185,
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
    url: string;
    index: number;
    openBrowserAction: WebBrowserOpenAction;
    item: any;
}

export default function PlayableSongPin(props: Props) {
    const { height, width } = useWindowDimensions();

    const pinWidth = Math.min(
        width - styles.itemContainer.margin * 2,
        400
    );
    const pinHeight = 200;

    return (
        <Pressable
            key={props.index}
            onPress={async () => {
                await props.openBrowserAction(props.url);
            }}
        >
            <View
                style={[
                    styles.itemContainer,
                    {
                        backgroundColor: props.item.code,
                        minWidth: pinWidth,
                        maxWidth: pinWidth,
                        minHeight: pinHeight,
                        maxHeight: pinHeight,
                    }
                ]}
            >
                <Text style={styles.itemName}>{props.item.name}</Text>
                <Text style={styles.itemCode}>
                    {props.item.code + ' \u25cf '}
                    {'Album' + ' \u25cf '}
                    {'2024'}
                </Text>
                <Text style={styles.itemCode}>
                    {'\u25b6' + '5:04' + ' \u25cf ' + '613,567,866'}
                </Text>
            </View>
        </Pressable>
    );
}