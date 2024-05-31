import { session } from "./sessions";
import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, Track } from "./types";
import { extractArtistsFromTracks } from './artists'

export async function extractGenresFromArtists(artists: Artist[])
    : Promise<string[]> {
    try {
        const genres = new Set<string>();
        for (const artist of artists) {
            for (const genre of artist.genres) {
                if (!genres.has(genre)) {
                    genres.add(genre);
                }
            }
        }
        return Array.from(genres.values());
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

export async function extractGenresFromTracks(tracks: Track[])
    : Promise<string[]> {
    try {
        const artists = await extractArtistsFromTracks(tracks);
        return await extractGenresFromArtists(artists);
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}