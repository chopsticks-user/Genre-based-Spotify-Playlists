import { session } from "./sessions";
import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, SearchQuery, Track, TrackItem } from "./types";

export async function getUserSavedTracks(): Promise<Track[]> {
    try {
        const response = await fetch(
            'https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            },
        });

        console.log('getUserSavedTracks');

        const data = await response.json();
        const trackItems: TrackItem[] = data.items;
        // TODO: remove outdated tracks
        return Promise.all(trackItems.map(async item => item.track));
    } catch (error: any) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

export function prepareSearchExtension(searchQuery: SearchQuery): string {
    let yearString = '';
    if (searchQuery.minYear === '' && searchQuery.maxYear === '') {
        yearString = `${searchQuery.maxYear}`;
    } else if (searchQuery.maxYear === '') {
        yearString = `${searchQuery.maxYear}`;
    } else {
        yearString = `${searchQuery.minYear}-${searchQuery.maxYear}`;
    }

    let q = searchQuery.track || '';
    q += searchQuery.artist ? ` artist:${searchQuery.artist}` : '';
    q += yearString !== '' ? ` year:${yearString}` : '';
    q += searchQuery.genre ? ` genre:${searchQuery.genre}` : '';

    return q;
}

export async function searchTracks(
    searchQuery: SearchQuery,
    offset?: number
): Promise<[next: number, Track[]]> {
    try {
        offset = (offset === undefined ? 0 : offset);
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${prepareSearchExtension(searchQuery)}&type=track&limit=1&offset=${offset}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            },
        });
        console.log('searchTracks');
        console.log(response);

        if (!response.ok) {
            const error = await response.json();
            throw `${error.error.message} (${error.error.status})`;
        }

        const data = await response.json();
        return [data.next === null ? -1 : offset + 1, data.tracks.items];
    } catch (error) {
        throw new Error(`@/spotify/searchTracks: ${error}`);
    }
}
