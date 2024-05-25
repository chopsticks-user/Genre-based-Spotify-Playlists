import { AccessToken } from "./userAuth";

export async function getUserPlaylists(accessToken: AccessToken): Promise<string> {
    const response = await fetch("https://api.spotify.com/v1/users//playlists", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`@/spotifyAPI/getUserPlaylist: ${errorMessage}`);
    }

    const data = await response.json();
    return data;
}