import {
    DocumentData, DocumentReference, addDoc, arrayUnion,
    collection, doc, getDoc, getDocs, query, setDoc, updateDoc,
    where
} from 'firebase/firestore';
import { app, db } from './init'
import { DocumentRef, PlaylistDAO, TrackGroup, UserDAO, Document, TrackDAO } from './types';
import { session } from '@/spotify';

export async function tryCreateUser(): Promise<Document> {
    try {
        const userDocRef = doc(db, 'users', session.userProfile.id)
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
            console.log('@/database/createUser: User already exists');
        } else {
            await setDoc(userDocRef, {});
            console.log('@/database/createUser: User created');
        }

        return userSnapshot;
    } catch (error) {
        throw new Error(`@/database/createUser: ${error}`);
    }
}

export async function getUserPlaylists(): Promise<PlaylistDAO[]> {
    try {
        const userDocRef = doc(db, 'users', session.userProfile.id);

        const userData = (await getDoc(userDocRef)).data();
        if (userData === undefined) {
            throw new Error(
                '@/database/getUserPlaylists: failed to get user playlists, user might not exist');
        }

        return userData?.playlists as PlaylistDAO[];
    } catch (error) {
        throw new Error(`@/database/getUserPlaylists: ${error}`);
    }
}

// async function genrePlaylistExists(genre: string): Promise<boolean> {

// }

export async function tryCreateGenrePlaylist(
    genre: string, fetchPlaylistID: () => Promise<string>): Promise<Document> {
    try {
        const playlistDocRef = doc(
            db, 'users', session.userProfile.id, 'playlists', genre
        );
        const playlistSnapshot = await getDoc(playlistDocRef);

        if (playlistSnapshot.exists()) {
            console.log('@/databse/addGenrePlaylist: genre playlist exists');
        } else {
            await setDoc(playlistDocRef, {
                playlistID: await fetchPlaylistID(),
                tracks: [],
            });
            console.log('@/databse/tryCreateGenrePlaylist: playlist added');
        }

        return playlistSnapshot;
    } catch (error) {
        throw new Error(`@/database/tryCreateGenrePlaylist: ${error}`);
    }
}

export async function addTracksToGenrePlaylists(
    genre: string,
    fetchPlaylistID: () => Promise<string>,
    tracks: TrackDAO[]
): Promise<void> {
    try {
        // const snapshot = await tryCreateGenrePlaylist(genre);
    } catch (error) {
        throw new Error(`@/database/addTracksToGenrePlaylists: ${error}`);
    }
}

// export async function addUserPlaylists(playlists: PlaylistDAO[]): Promise<void> {
//     try {
//         const userDocRef = doc(db, 'users', session.userProfile.id);
//         await updateDoc(userDocRef, {
//             playlists: arrayUnion(...playlists),
//         });
//         console.log('@/database/addUserPlaylists: playlists added');
//     } catch (error) {
//         throw new Error(`@/database/addUserPlaylists: ${error}`);
//     }
// }
