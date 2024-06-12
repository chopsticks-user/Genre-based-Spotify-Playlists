import { modulePath } from "./constants";
import * as Configs from '@/configs'
import { Playlist } from "./types";

export async function getUserPlaylists(
    accessToken: string,
    userSpotifyID: string
): Promise<string> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/users/${userSpotifyID}/playlists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return await response.json();
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

export async function createUserPlaylist(
    accessToken: string,
    userSpotifyID: string,
    name: string,
    public_?: boolean,
    collaborative?: boolean,
    description?: string
): Promise<Playlist> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/users/${userSpotifyID}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                public: public_ === undefined ? false : true,
                collaborative: collaborative === undefined ? false : true,
                description: description === undefined ?
                    "Created by Playtify" : description
            })
        });
        return await response.json();
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

export async function addSongsToPlaylist(
    accessToken: string,
    playlistID: string,
    trackIDs: string[]
): Promise<string> {
    try {
        const uris = trackIDs.map(id => {
            return `spotify:track:${id}`;
        });
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: uris,
            })
        });
        return await response.json();
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

export async function removeSongsFromPlaylist(
    accessToken: string,
    playlistID: string,
    trackIDs: string[]
): Promise<string> {
    try {
        const tracks = trackIDs.map(id => {
            return { uri: `spotify:track:${id}` };
        });

        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tracks: tracks,
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw `${error.error.message} (${error.error.status})`;
        }

        return await response.json();
    } catch (error) {
        throw new Error(`@/spotify/removeSongsFromPlaylist: ${error}`);
    }
}

export async function changePlaylistDetails(
    accessToken: string,
    playlistID: string,
    name: string,
    description: string
): Promise<void> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description === undefined ?
                    "Created by Playtify" : description
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw `${error.error.message} (${error.error.status})`;
        }
    } catch (error) {
        throw new Error(`@/spotify/changePlaylistDetails: ${error}`);
    }
}

export async function unfollowPlaylist(
    accessToken: string,
    playlistID: string
): Promise<void> {
    try {
        await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('unfollowPlaylist');
    } catch (error) {
        throw new Error(`@/spotify/unfollowPlaylist: ${error}`);
    }
}

export async function getPlaylistCoverImageURI(
    accessToken: string,
    playlistID: string
): Promise<string | null> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/images`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log('getPlaylistCoverImageURI');

        const data = await response.json();
        return data.length > 0 ? data[0].url : null;
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}