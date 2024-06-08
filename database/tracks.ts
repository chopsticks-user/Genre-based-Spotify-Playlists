import {
    arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, limit, orderBy, query, updateDoc,
    where,
} from 'firebase/firestore';
import { db, genreNameDB, genreNameUI } from './init'
import { RecommendationData, TrackDAO } from './types';
import { addPlaylist } from './playlists';
import { session } from '@/spotify/sessions';
import { Playlist } from '@/spotify';

export async function addTracks(
    genre: string,
    createSpotifyPlaylist: () => Promise<Playlist>,
    tracks: TrackDAO[]
): Promise<string> {
    try {
        const trackIDs: string[] = tracks.map(track => {
            return track.id;
        });
        const userDocRef = doc(db, 'users', session.userProfile.id);
        await updateDoc(userDocRef, {
            tracks: arrayUnion(...trackIDs),
        });

        const genreDB: string = genreNameDB(genre);
        const playlistDocRef = await addPlaylist(genreDB, createSpotifyPlaylist);
        await updateDoc(playlistDocRef, {
            tracks: arrayUnion(...tracks),
        });
        const playlistSnapshot = await getDoc(playlistDocRef);

        const genresDocRef = doc(
            db, `/users/${session.userProfile.id}/genres/${genreDB}`
        );
        await updateDoc(genresDocRef, {
            count: increment(1),
        });

        return playlistSnapshot.data()?.id as string;
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
        const genreDB = genreNameDB(genre);
        const playlistDocRef = doc(
            db, `/users/${session.userProfile.id}/playlists/${genreDB}`
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
): Promise<string> {
    try {
        const genreDB = genreNameDB(genre);
        const trackIDs: string[] = tracks.map(track => {
            return track.id;
        });
        const userDocRef = doc(db, 'users', session.userProfile.id);
        await updateDoc(userDocRef, {
            tracks: arrayRemove(...trackIDs),
        });

        const playlistDocRef = doc(
            db, `/users/${session.userProfile.id}/playlists/${genreDB}`
        );
        await updateDoc(playlistDocRef, {
            tracks: arrayRemove(...tracks),
        });
        const playlistSnapshot = await getDoc(playlistDocRef);

        const genresDocRef = doc(
            db, `/users/${session.userProfile.id}/genres/${genreDB}`
        );
        await updateDoc(genresDocRef, {
            count: increment(-1),
        });

        return playlistSnapshot.data()?.id as string;
    } catch (error) {
        throw new Error(`@/database/removeTracks: ${error}`);
    }
}

export async function getRecommendationData()
    : Promise<RecommendationData> {
    try {
        const genresCollRef = collection(
            db, `/users/${session.userProfile.id}/genres`
        );
        const genresSnapshots = await getDocs(
            query(genresCollRef, orderBy('count', 'desc'), limit(3))
        );
        const genres: string[] = genresSnapshots.docs.map(doc => doc.data().name);

        const userDocSnapshot = await getDoc(
            doc(db, `/users/${session.userProfile.id}`)
        );
        const allTrackIDs: string[] = userDocSnapshot.data()?.tracks;
        if (allTrackIDs.length < 3) {
            return { genres: genres, trackIDs: allTrackIDs };
        }

        const indices = <Set<number>>{};
        while (indices.size < 2) {
            const index = Math.max(
                Math.round(Math.random() * allTrackIDs.length),
                allTrackIDs.length
            );
            if (!indices.has(index)) {
                indices.add(index);
            }
        }

        return {
            genres: genres,
            trackIDs: Array.from(indices).map(index => {
                return allTrackIDs[index];
            }),
        };
    } catch (error) {
        throw new Error(`@/database/getRecommendationData: ${error}`);
    }
}