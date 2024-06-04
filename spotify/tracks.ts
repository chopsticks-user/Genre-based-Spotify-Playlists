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
        // throw new Error("test");
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

    return new URLSearchParams({
        track: searchQuery.track,
        artist: searchQuery.artist,
        year: yearString,
        genre: searchQuery.genre,
    }).toString().replaceAll('=', ':').replaceAll('&', '%').replace('track:', '');
}

export async function searchTracks(
    searchQuery: SearchQuery,
    offset?: number
): Promise<[next: number, Track[]]> {
    offset = (offset === undefined ? 0 : offset);
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${prepareSearchExtension(searchQuery)}&type=track&limit=50&offset=${offset}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            },
        });

        console.log('searchTracks');
        console.log(response);

        const data = await response.json();
        const trackItems: TrackItem[] = data.items;
        return Promise.all([
            data.next === null ? -1 : offset + 1,
            Promise.all(trackItems.map(async item => item.track))
        ]);
    } catch (error: any) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}
