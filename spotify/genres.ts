import { session } from "./sessions";
import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, Track, ExtractedGenres } from "./types";
import { getArtistsFromTracks } from './artists'

// export async function extractGenresFromArtists(artists: Artist[])
//     : Promise<string[]> {
//     try {
//         const genres = new Set<string>();
//         for (const artist of artists) {
//             for (const genre of artist.genres) {
//                 if (!genres.has(genre)) {
//                     genres.add(genre);
//                 }
//             }
//         }
//         return Array.from(genres.values());
//     } catch (error) {
//         throw Configs.createError(modulePath, arguments.callee.name, error);
//     }
// }

export async function extractGenresFromTracks(tracks: Track[])
    : Promise<ExtractedGenres[]> {
    try {
        const artists: Artist[] = await getArtistsFromTracks(tracks);
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