import { DocumentData, DocumentReference, DocumentSnapshot } from "firebase/firestore";

export interface TrackDAO {
    spotifyID: string;
};

export interface PlaylistDAO {
    spotifyID: string;
    tracks: TrackDAO[];
};

export interface UserDAO {
    playlists: PlaylistDAO[];
};

export interface TrackGroup {
    genre: string;
    tracks: TrackDAO[];
};

export type DocumentRef = DocumentReference<DocumentData, DocumentData>;

export type Document = DocumentSnapshot<any>;
