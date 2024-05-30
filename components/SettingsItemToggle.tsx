import { useState } from "react";
import {
    TouchableOpacity, View, StyleSheet, Text, Switch
} from "react-native";


export interface SettingsItemToggleProps {
    label: string,
    icon: {
        element: any,
        color: string,
    }
};

export default function SettingsItemToggle(props: SettingsItemToggleProps) {
    const [value, setValue] = useState(false);

    return (
        <TouchableOpacity
            key={props.label}
        >
            <View style={styles.sectionItem}>
                <View style={[styles.sectionItemIcon, { backgroundColor: props.icon.color }]}>
                    {props.icon.element}
                </View>
                <Text style={styles.sectionItemLabel}>{props.label}</Text>
                <View style={{ flex: 1 }} />
                <Switch
                    value={value}
                    onValueChange={() => setValue(!value)}
                />
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