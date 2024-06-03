import {
    arrayRemove, arrayUnion, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { db } from './init'
import { TrackDAO } from './types';
import { addPlaylist } from './playlists';
import { session } from '@/spotify/sessions';

export async function addTracks(
    genre: string,
    fetchPlaylistID: () => Promise<string>,
    tracks: TrackDAO[]
): Promise<void> {
    try {
        const playlistDocRef = await addPlaylist(genre, fetchPlaylistID);
        await updateDoc(playlistDocRef, {
            tracks: arrayUnion(...tracks),
        });
    } catch (error) {
        throw new Error(`@/database/addTracks: ${error}`);
    }
}

export async function getTracks(genre: string)
    : Promise<TrackDAO[]> {
    try {
        const playlistDocRef = doc(
            db, `/users/${session.userProfile.id}/playlists/${genre}`
        );

        const playlistSnapshot = await getDoc(playlistDocRef);
        if (!playlistSnapshot.exists()) {
            throw new Error('@/database/getTracks: playlist not found');
        }

        return playlistSnapshot.data().tracks as TrackDAO[];
    } catch (error) {
        throw new Error(`@/database/getTracks: ${error}`);
    }
}

export async function removeTracks(
    genre: string, tracks: TrackDAO[]
): Promise<void> {
    try {
        const playlistDocRef = doc(
            db, `/users/${session.userProfile.id}/playlists/${genre}`
        );

        await updateDoc(playlistDocRef, {
            tracks: arrayRemove(...tracks),
        });
    } catch (error) {
        throw new Error(`@/database/removeTracks: ${error}`);
    }
}