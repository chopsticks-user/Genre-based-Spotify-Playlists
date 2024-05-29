import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            // tabBarStyle: {
            //     backgroundColor: '#000',
            // },
        }} />
    );
}