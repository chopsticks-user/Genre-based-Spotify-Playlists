import { session } from "./sessions";
import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, Track, TrackItem } from "./types";

export async function getUserSavedTracks(): Promise<Array<Track>> {
    try {
        const response = await fetch(
            'https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            },
        });

        const data = await response.json();
        const trackItems: Array<TrackItem> = data.items;
        return Promise.all(trackItems.map(async item => item.track));
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

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
