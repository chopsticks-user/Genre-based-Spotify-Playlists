import { AccessToken } from "./userAuth";

export async function getUserID(accessToken: AccessToken): Promise<string> {
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`@/spotifyAPI/getUserID: ${errorMessage}`);
    }

    const data = await response.json();
    return data.id;
}
