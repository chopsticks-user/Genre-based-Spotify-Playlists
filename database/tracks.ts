import {
    collection, deleteDoc, doc, getDoc, getDocs, or, query, setDoc, updateDoc,
    where
} from 'firebase/firestore';
import { app, db } from './init'
import {
    DocumentRef, PlaylistDAO, TrackGroup, UserDAO, Document, TrackDAO
} from './types';
import { addPlaylist } from './playlists';
import { session } from '@/spotify';

export async function addTracks(
    genre: string,
    fetchPlaylistID: () => Promise<string>,
    tracks: TrackDAO[]
): Promise<void[]> {
    try {
        const playlistDocRef = await addPlaylist(genre, fetchPlaylistID);
        return Promise.all(tracks.map(async trackDAO => {
            const trackDocRef = doc(playlistDocRef, 'tracks', trackDAO.id);
            const trackDoc = await getDoc(trackDocRef);

            if (trackDoc.exists()) {
                return;
            }

            return await setDoc(trackDocRef, {});
        }));
    } catch (error) {
        throw new Error(`@/database/addTracksToGenrePlaylists: ${error}`);
    }
}

export async function getTracks(genre: string)
    : Promise<string[]> {
    try {
        const tracksSnapshot = await getDocs(
            collection(
                db, 'users',
                session.userProfile.id, 'playlists',
                genre, 'tracks'
            )
        );

        return Promise.all(tracksSnapshot.docs.map(async doc => {
            return doc.id;
        }));
    } catch (error) {
        throw new Error(`@/database/getTracksFromGenrePlaylist: ${error}`);
    }
}

export async function removeTracks(
    genre: string, tracks: TrackDAO[]
): Promise<void> {
    try {
        const tracksDocRef = doc(
            db, 'users', session.userProfile.id,
            'playlists', genre
        );
        // await deleteDoc(tracksDocRef,);
    } catch (error) {
        throw new Error(`@/database/removeTracksFromGenrePlaylists: ${error}`);
    }

}