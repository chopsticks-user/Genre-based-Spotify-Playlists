import { session } from "./sessions";

export async function getUserPlaylists(): Promise<string> {
    const response = await fetch(
        `https://api.spotify.com/v1/users/${session.userProfile.id}/playlists`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${session.accessToken}`
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`@/spotifyAPI/getUserPlaylist: ${errorMessage}`);
    }

    const data = await response.json();
    return data;
}