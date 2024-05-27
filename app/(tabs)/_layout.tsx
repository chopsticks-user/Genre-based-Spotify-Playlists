import { Stack, Tabs } from 'expo-router'

export default function () {
    // return <Stack screenOptions={{ headerShown: false }} />;
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="settings" />
        </Tabs>
    );
}