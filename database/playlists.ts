import {
    collection, deleteDoc, doc, getDoc, getDocs, or, query, setDoc, updateDoc,
    where
} from 'firebase/firestore';
import { app, db } from './init'
import {
    DocumentRef, PlaylistDAO,
} from './types';
import { session } from '@/spotify';

export async function getPlaylists(): Promise<PlaylistDAO[]> {
    try {
        const playlistsSnapshot = await getDocs(
            collection(db, `/users/${session.userProfile.id}/playlists`)
        );

        return Promise.all(playlistsSnapshot.docs.map(async doc => {
            return doc.data() as PlaylistDAO;
        }));
    } catch (error) {
        throw new Error(`@/database/getPlaylists: ${error}`);
    }
}

export async function addPlaylist(
    genre: string, fetchPlaylistID: () => Promise<string>): Promise<DocumentRef> {
    try {
        const playlistDocRef = doc(
            db, `/users/${session.userProfile.id}/playlists/${genre}`
        );
        const playlistSnapshot = await getDoc(playlistDocRef);

        if (!playlistSnapshot.exists()) {
            await setDoc(playlistDocRef, {
                id: await fetchPlaylistID(),
                genre: genre,
                tracks: [],
            });
        }

        return playlistDocRef;
    } catch (error) {
        throw new Error(`@/database/addPlaylist: ${error}`);
    }
}

export async function removePlaylist(genre: string) {
    try {
        const playlistDocRef = doc(
            db, `/users/${session.userProfile.id}/playlists/${genre}`
        );
        await deleteDoc(playlistDocRef);
    } catch (error) {
        throw new Error(`@/database/removePlaylist: ${error}`);
    }
}