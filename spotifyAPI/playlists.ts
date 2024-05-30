import { modulePath } from "./constants";
import { session } from "./sessions";
import * as Configs from '@/configs'

export async function getUserPlaylists(): Promise<string> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/users/${session.userProfile.id}/playlists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            }
        });

        return await response.json();
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}