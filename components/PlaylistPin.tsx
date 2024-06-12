import React, { useEffect, useState } from "react";
import { usePinDimensions } from "@/hooks/usePinDimensions";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { PlaylistDAO, editPlaylistImage } from "@/database";
import * as WebBrowser from "expo-web-browser";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { changePlaylistDetails, getPlaylistCoverImageURI } from "@/spotify";
import { editPlaylist } from "@/database";
import useSession from "@/hooks/useSession";

interface Props {
  index: number;
  data: PlaylistDAO;
  removeSelf: () => Promise<void>;
}

export default function PlaylistPin(props: Props) {
  const session = useSession();

  const [width, height] = usePinDimensions(styles.itemContainer.margin);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState(props.data.name);
  const [newDescription, setNewDescription] = useState(
    props.data.description || ""
  );

  const handleEdit = async () => {
    try {
      await editPlaylist(
        session.userProfile,
        props.data.genre,
        newName,
        newDescription
      );
      await changePlaylistDetails(
        session.accessToken,
        props.data.id,
        newName,
        newDescription
      );
      props.data.name = newName;
      props.data.description = newDescription;
    } catch (error) {
      console.log(error);
    }

    setModalVisible(false);
  };

  const [imageURI, setImageURI] = useState<string | null>(props.data.imageURI);
  const [refreshLocked, setRefreshLocked] = useState<boolean>(false);

  const refreshCoverImage = async () => {
    if (refreshLocked) {
      return;
    }
    setRefreshLocked(true);

    try {
      const uri = await getPlaylistCoverImageURI(
        session.accessToken,
        props.data.id
      );
      await editPlaylistImage(session.userProfile, props.data.genre, uri);
      setImageURI(uri);
      props.data.imageURI = uri;
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setRefreshLocked(false);
    }, 1500);
  };

  useEffect(() => {
    refreshCoverImage()
      .then((res) => {})
      .catch((error) => console.log(error));
  }, []);

  return (
    <Pressable
      key={props.index}
      onPress={() => {
        router.push({
          pathname: "/playlists/details",
          params: {
            playlist: JSON.stringify(props.data),
            tracks: JSON.stringify(props.data.tracks),
          },
        });
      }}
    >
      <ImageBackground
        source={{
          uri:
            imageURI ||
            "https://via.placeholder.com/640x640.png?text=Playlist+Image",
        }}
        style={[
          styles.itemContainer,
          {
            minWidth: width,
            maxWidth: width,
            minHeight: height,
            maxHeight: height,
          },
        ]}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            {/* <TouchableOpacity
                            style={styles.removeButton}
                            onPress={props.removeSelf}
                        >
                            <FontAwesome6 name="trash-alt" size={20} color="white" />
                        </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setModalVisible(true)}
            >
              <Feather name="edit" size={20} color="white" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            {/* <TouchableOpacity
                            style={styles.editButton}
                            onPress={refreshCoverImage}
                        >
                            <SimpleLineIcons name="refresh" size={20} color="white" />
                        </TouchableOpacity> */}
            <TouchableOpacity
              onPress={async () => {
                const url = props.data.url;
                if (url !== undefined) {
                  await WebBrowser.openBrowserAsync(url);
                }
              }}
            >
              <FontAwesome name="spotify" size={36} color="green" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
          <View
            style={[
              styles.textWrapper,
              {
                backgroundColor:
                  imageURI === undefined
                    ? styles.itemContainer.backgroundColor
                    : "#000000a0",
              },
            ]}
          >
            <Text style={styles.itemName}>{props.data.name}</Text>
          </View>
        </View>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Playlist</Text>
          <TextInput
            style={styles.input}
            placeholder="New Playlist Name"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="New Playlist Description"
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#262626",
    justifyContent: "flex-end",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    position: "relative",
  },
  textWrapper: {
    backgroundColor: "#000000a0",
    padding: 10,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "600",
    flexWrap: "wrap",
    textAlign: "center",
    textTransform: "capitalize",
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    backgroundColor: "green",
    borderRadius: 10000,
    marginRight: 5,
  },
  refreshButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    backgroundColor: "green",
    borderRadius: 10000,
    margin: 10,
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    backgroundColor: "red",
    borderRadius: 10000,
  },
  editIcon: {
    fontSize: 12,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#151719",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ECEDEE",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "80%",
    color: "#ECEDEE",
  },
  saveButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    marginVertical: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
    marginVertical: 10,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
