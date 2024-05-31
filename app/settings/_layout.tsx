import { Stack, router } from "expo-router";
import { Platform } from "react-native";
import { HeaderBackButton } from '@react-navigation/elements';

const screenOptions: any = {
    headerShown: true,
    headerStyle: {
        backgroundColor: '#000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerBackButtonMenuEnabled: true,
    // tabBarStyle: {
    //     backgroundColor: '#000',
    // },
};

export default function SettingsLayout() {
    if (Platform.OS === 'ios') {
        screenOptions.headerLeft = (props: any) => (
            <HeaderBackButton
                onPress={() => {
                    router.back();
                }}
            />
        );
        return (
            <Stack screenOptions={screenOptions} />
        );
    }

    return (
        <Stack screenOptions={screenOptions} />
    );
}