import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { NewGenresProvider } from "@/contexts/NewGenres";
import { useTheme } from "@/hooks/useTheme";
import { SessionProvider } from "@/contexts/SessionProvider";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    // <SessionProvider>
    <NewGenresProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.header,
          },
          headerTitleAlign: "center",
          headerTintColor: theme.text,
          tabBarStyle: {
            backgroundColor: theme.tab,
          },
        }}
        sceneContainerStyle={{
          backgroundColor: theme.screen,
        }}
      >
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" size={24} color={theme.icon} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Playtify",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="home" color={theme.icon} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-music"
                size={24}
                color={theme.icon}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="cog" color={theme.icon} />
            ),
          }}
        />
      </Tabs>
    </NewGenresProvider>
    // </SessionProvider>
  );
}
