import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#000',
                },
            }}
            sceneContainerStyle={{
                backgroundColor: '#151718',
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Playtify',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={24} name="home" color={color} />,
                }} />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) =>
                        <AntDesign name="search1" size={24} color="white" />
                }}
            />
            <Tabs.Screen
                name="dev"
                options={{
                    title: 'Dev',
                    tabBarIcon: ({ color }) =>
                        <MaterialIcons name="developer-mode" size={24} color="white" />
                }}
            />
            <Tabs.Screen
                name="playlists"
                options={{
                    title: 'Playlists',
                    tabBarIcon: ({ color }) =>
                        <MaterialCommunityIcons
                            name="playlist-music" size={24} color="white" />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={24} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}