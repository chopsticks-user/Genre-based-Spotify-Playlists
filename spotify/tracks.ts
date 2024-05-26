import { session } from "./sessions";
import * as Configs from '@/configs'
import { modulePath } from "./constants";
import { Artist, Track, TrackItem } from "./types";

export async function getUserSavedTracks(): Promise<Track[]> {
    try {
        const response = await fetch(
            'https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            },
        });

        const data = await response.json();
        const trackItems: TrackItem[] = data.items;
        return Promise.all(trackItems.map(async item => item.track));
    } catch (error: any) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
        // throw new Error("test");
    }
}
