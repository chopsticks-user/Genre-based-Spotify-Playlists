import { PropsWithChildren } from "react";
import { View, StyleSheet, Text } from "react-native";

export interface SettingsSectionProps extends PropsWithChildren {
    header: string;
};

export default function SettingsSection(props: SettingsSectionProps) {
    return (
        <View key={props.header} style={styles.section}>
            <Text style={styles.sectionHeader}>{props.header}</Text>
            <View>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 10,
    },
    sectionHeader: {
        paddingTop: 25,
        paddingBottom: 20,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
});