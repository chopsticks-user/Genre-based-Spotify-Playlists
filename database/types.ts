import {
    DocumentData, DocumentReference, DocumentSnapshot
} from "firebase/firestore";

export interface TrackDAO {
    id: string;
};

export interface PlaylistDAO {
    id: string;
    genre: string;
    tracks: TrackDAO[];
};

export interface UserDAO {
    playlists: PlaylistDAO[];
};
