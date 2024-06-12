import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, SearchQuery, Track, TrackItem } from "./types";

export async function getUserSavedTracks(accessToken: string): Promise<Track[]> {
    try {
        const response = await fetch(
            'https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
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
    accessToken: string,
    searchQuery: SearchQuery,
    offset?: number
): Promise<[next: number, Track[]]> {
    try {
        offset = (offset === undefined ? 0 : offset);
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${prepareSearchExtension(searchQuery)}&type=track&limit=50&offset=${offset}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
        console.log('searchTracks');

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

function prepareRecommendationExtension(
    genres: string[],
    trackIDs: string[]
): string {
    const genresNoSpaces = genres.map(genre => genre.replaceAll(' ', '+'));
    const seed_genres: string = genresNoSpaces.length === 0 ? ''
        : genresNoSpaces.reduce((acc, val, index) => {
            return acc += `%2C${val}`;
        });
    const seed_tracks: string = trackIDs.length === 0 ? ''
        : trackIDs.reduce((acc, val, index) => {
            return acc += `%2C${val}`;
        });

    let extension = seed_genres === '' ? '' : `&seed_genres=${seed_genres}`;
    extension += seed_tracks === '' ? '' : `&seed_tracks=${seed_tracks}`;
    return extension;
}

export async function getRecommendations(
    accessToken: string,
    genres: string[],
    trackIDs: string[]
): Promise<Track[]> {
    try {
        if (genres.length === 0 && trackIDs.length === 0) {
            return [];
        }

        const response = await fetch(
            `https://api.spotify.com/v1/recommendations?limit=50${prepareRecommendationExtension(genres, trackIDs)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
        console.log('getRecommendations');

        if (!response.ok) {
            const error = await response.json();
            throw `${error.error.message} (${error.error.status})`;
        }

        const data = await response.json();
        return data.tracks;
    } catch (error) {
        throw new Error(`@/spotify/getRecommendations: ${error}`);
    }
}

function prepareSeveralTrackRequest(trackIDs: string[]): string {
    // !100 ids each
    return trackIDs.reduce((acc, item, index) => {
        if (index === 0) {
            return acc += item;
        }
        return acc += `%2C${item}`;
    });
}

export async function getSeveralTracks(
    accessToken: string,
    trackIDs: string[]
): Promise<Track[]> {
    try {
        if (trackIDs.length === 0) {
            return [];
        }

        const response = await fetch(
            `https://api.spotify.com/v1/tracks?ids=${prepareSeveralTrackRequest(trackIDs)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        console.log('getSeveralTracks');

        const data = await response.json();
        return data.tracks as Track[];
    } catch (error) {
        throw new Error(`@/spotify/getSeveralTracks: ${error}`);
    }
}
