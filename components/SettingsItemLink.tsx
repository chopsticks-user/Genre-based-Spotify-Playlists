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
    onPress?: ((event: GestureResponderEvent) => void),
};

export default function SettingsitemLink(props: SettingsItemLinkProps) {
    return (
        <TouchableOpacity
            key={props.label}
            onPress={props.onPress}
        >
            <View style={styles.sectionItem}>
                <View style={[styles.sectionItemIcon, { backgroundColor: props.icon.color }]}>
                    {props.icon.element}
                </View>
                <Text style={styles.sectionItemLabel}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#262626',
        marginVertical: 5,
        height: 40,
        borderRadius: 10,
    },
    sectionItemLabel: {
        color: '#ECEDEE',
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