import {
    DocumentData, DocumentReference, collection, deleteDoc, doc,
    getDoc, getDocs, setDoc,
} from 'firebase/firestore';
import { db } from './init'
import { PlaylistDAO } from './types';
import { session } from '@/spotify/sessions';

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
    genre: string, fetchPlaylistID: () => Promise<string>
): Promise<DocumentReference<DocumentData, DocumentData>> {
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

export async function removePlaylist(genre: string): Promise<void> {
    try {
        const playlistDocRef = doc(
            db, `/users/${session.userProfile.id}/playlists/${genre}`
        );
        await deleteDoc(playlistDocRef);
    } catch (error) {
        throw new Error(`@/database/removePlaylist: ${error}`);
    }
}