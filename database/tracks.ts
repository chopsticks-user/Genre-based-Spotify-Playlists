import {
    arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc,
    where,
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
        const trackIDs: string[] = tracks.map(track => {
            return track.id;
        });
        const userDocRef = doc(db, 'users', session.userProfile.id);
        await updateDoc(userDocRef, {
            tracks: arrayUnion(...trackIDs),
        });

        const playlistDocRef = await addPlaylist(genre, fetchPlaylistID);
        await updateDoc(playlistDocRef, {
            tracks: arrayUnion(...tracks),
        });
    } catch (error) {
        throw new Error(`@/database/addTracks: ${error}`);
    }
}

export async function trackExists(trackID: string): Promise<boolean> {
    try {
        // TODO: consider using queries
        const userSnapshot = await getDoc(
            doc(db, 'users', session.userProfile.id)
        );
        const tracks: string[] = userSnapshot.data()?.tracks;
        return tracks.includes(trackID);
    } catch (error) {
        throw new Error(`@/databse/trackExists: ${error}`);
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
        const trackIDs: string[] = tracks.map(track => {
            return track.id;
        });
        const userDocRef = doc(db, 'users', session.userProfile.id);
        await updateDoc(userDocRef, {
            tracks: arrayRemove(...trackIDs),
        });

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