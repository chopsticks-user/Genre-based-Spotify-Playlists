import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, Tabs, router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { useWebBrowser } from '@/hooks/useWebBrowser';
import { session } from '@/spotify';

export interface SearchParamList {
    Library: { text: string, value: number };
};

export default function TabsLayout() {
    const browserOpenAction = useWebBrowser();

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
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) =>
                        <AntDesign name="search1" size={24} color="white" />
                }}
            // listeners={() => ({
            //     tabPress: async (e) => {
            //         e.preventDefault()
            //         await browserOpenAction("https://open.spotify.com/search")
            //     },
            // })}
            />
            {/* <Tabs.Screen
                name="library"
                options={{
                    title: 'Library',
                    tabBarIcon: ({ color }) =>
                        <MaterialIcons name="my-library-music" size={24} color="white" />,
                }}
            /> */}
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Playtify',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={24} name="home" color={color} />,
                }} />
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