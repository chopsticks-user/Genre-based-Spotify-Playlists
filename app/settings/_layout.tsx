import { Stack, router } from "expo-router";
import { Platform } from "react-native";
import { HeaderBackButton } from '@react-navigation/elements';
import { useTheme } from "@/hooks/useTheme";

export default function SettingsLayout() {
    const theme = useTheme();

    return (
        <Stack screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackButtonMenuEnabled: true,
            headerLeft: Platform.OS === 'ios'
                ? (props: any) => <HeaderBackButton onPress={() => router.back()} />
                : undefined,
            headerStyle: { backgroundColor: theme.header },
            headerTintColor: theme.text,
        }}
        />
    );
}