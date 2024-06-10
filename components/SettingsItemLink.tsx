import { useTheme } from "@/hooks/useTheme";
import {
    GestureResponderEvent, TouchableOpacity, View,
    StyleSheet, Text
} from "react-native";


export interface SettingsItemLinkProps {
    label: string,
    icon: {
        element: any,
        color: string,
    }
    onPress: ((event: GestureResponderEvent) => void),
};

export default function SettingsItemLink(props: SettingsItemLinkProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            key={props.label}
            onPress={props.onPress}
        >
            <View
                style={[
                    styles.sectionItem,
                    { backgroundColor: theme.section }
                ]}
            >
                <View
                    style={[
                        styles.sectionItemIcon,
                        { backgroundColor: props.icon.color }
                    ]}
                >
                    {props.icon.element}
                </View>
                <Text
                    style={[
                        styles.sectionItemLabel,
                        { color: theme.text }
                    ]}
                >
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
        height: 40,
        borderRadius: 10,
    },
    sectionItemLabel: {
        fontSize: 15,
        fontWeight: '400',
        marginHorizontal: 10,
    },
    sectionItemIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        height: 30,
        width: 30,
        borderRadius: 10000,
    },
});