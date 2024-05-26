import { session } from "./sessions";
import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, Track } from "./types";

export async function extractArtistsFromTracks(tracks: Array<Track>)
    : Promise<Array<Artist>> {
    const artists = new Map<string, Artist>();
    for (const track of tracks) {
        for (const artist of track.artists) {
            if (!artists.has(artist.id)) {
                artists.set(artist.id, artist);
            }
        }
    }
    return Array.from(artists.values());
}

export async function getArtistFromID(artistID: string): Promise<Artist> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/artists/${artistID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            },
        });

        return await response.json();
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

export async function getArtistsFromTracks(tracks: Array<Track>)
    : Promise<Array<Artist>> {
    try {
        const trackArtists = await extractArtistsFromTracks(tracks);
        return Promise.all(trackArtists.map(async trackArtist => {
            return await getArtistFromID(trackArtist.id);
        }));
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}