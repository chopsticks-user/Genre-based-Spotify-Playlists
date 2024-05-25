import { session } from "./sessions";
import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, Track } from "./types";

export async function extractGenresFromArtists(artists: Array<Artist>)
    : Promise<Array<string>> {
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