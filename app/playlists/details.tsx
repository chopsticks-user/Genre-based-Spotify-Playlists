import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Track, getSeveralTracks } from "@/spotify";
import PlaylistTrackPin from "@/components/PlaylistTrackPin";
import { useWebBrowser } from "@/hooks/useWebBrowser";
import { PlaylistDAO, getTracks } from "@/database";
import useSession from "@/hooks/useSession";

export default function Details() {
  const session = useSession();
  const { playlist: playlistParam, tracks: trackIDsParam = "[]" } =
    useLocalSearchParams<{ playlist: string; tracks: string }>();
  const parsedPlaylist: PlaylistDAO = JSON.parse(playlistParam as string);

  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTracks = async () => {
    setIsLoading(true);

    setTracks([]);
    const trackIDs = await getTracks(session.userProfile, parsedPlaylist.genre);
    const fetchedTracks: Track[] = await getSeveralTracks(
      session.accessToken,
      trackIDs.map((track: any) => track.id)
    );
    setTracks(fetchedTracks);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTracks().then((res) => {});
  }, []);

  const cleanDescription = (description: string) => {
    if (!description) return "";
    let cleanedDescription = description.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    cleanedDescription = cleanedDescription.replace(
      /Curated by.*?(?=\.)\./,
      ""
    ); // Remove "Curated by" section
    cleanedDescription = cleanedDescription.replace(
      /Photography by.*?(?=\.)\./,
      ""
    ); // Remove "Photography by" section
    return cleanedDescription;
  };

  const description = cleanDescription(parsedPlaylist.description as string);

  if (!parsedPlaylist) {
    return <Text>Loading...</Text>;
  }

  const openBrowserAction = useWebBrowser();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.playlistContainer}>
          <Image
            source={{
              uri:
                parsedPlaylist.imageURI ||
                "https://via.placeholder.com/640x640.png?text=Playlist+Image",
            }}
            style={styles.playlistImage}
          />
          <Text style={styles.title}>{parsedPlaylist.name}</Text>
          <Text style={styles.description}>{description || ""}</Text>
          <Text style={styles.genre}>Genre: {parsedPlaylist.genre} </Text>
          <View style={styles.tracksContainer}></View>
        </View>
        <View>
          {tracks.map((track, index) => (
            <PlaylistTrackPin
              key={index}
              index={index}
              track={track}
              openBrowserAction={openBrowserAction}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151718",
  },
  playlistContainer: {
    padding: 20,
  },
  playlistImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "lightgrey",
    marginBottom: 10,
  },
  genre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  tracksContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
