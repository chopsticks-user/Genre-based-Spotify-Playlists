import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, Track } from "./types";

export async function extractArtistsFromTracks(tracks: Track[])
    : Promise<string[]> {
    const artists = new Map<string, string>();
    for (const track of tracks) {
        for (const artist of track.artists) {
            if (!artists.has(artist.id)) {
                artists.set(artist.id, artist.id);
            }
        }
    }
    return Array.from(artists.values());
}

function prepareArtistIDForRequest(artistIDs: string[]): string {
    // !100 ids each
    const first100Items = artistIDs.slice(0, 100);
    return first100Items.reduce((acc, item, index) => {
        if (index === 0) {
            return acc += item;
        }
        return acc += `%2C${item}`;
    });
}

export async function getArtistsFromIDs(
    accessToken: string,
    artistIDs: string[]
): Promise<Artist[]> {
    try {
        const idsString = prepareArtistIDForRequest(artistIDs);
        const response = await fetch(
            `https://api.spotify.com/v1/artists?ids=${idsString}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        const result = await response.json();
        return result.artists;
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

export async function getArtistsFromTracks(accessToken: string, tracks: Track[])
    : Promise<Artist[]> {
    try {
        const artistIDs: string[] = await extractArtistsFromTracks(tracks);
        return await getArtistsFromIDs(accessToken, artistIDs);
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}