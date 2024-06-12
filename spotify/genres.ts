import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, Track, ExtractedGenres } from "./types";
import { getArtistsFromTracks } from './artists'

export async function extractGenresFromTracks(accessToken: string, tracks: Track[])
    : Promise<ExtractedGenres[]> {
    try {
        const artists: Artist[] = await getArtistsFromTracks(accessToken, tracks);
        console.log('extractGenresFromTracks');
        return Promise.all(tracks.map(async track => {
            const artistNames: string[] = track.artists.map(artist => artist.name);
            const genres = new Set<string>();
            genres.clear();
            artists.forEach(artist => {
                if (artist.genres === undefined || !artistNames.includes(artist.name)) {
                    return;
                }
                artist.genres.forEach(genre => {
                    if (!genres.has(genre)) {
                        genres.add(genre);
                    }
                });
            });
            return { trackID: track.id, genres: Array.from(genres.values()) };
        }));
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}