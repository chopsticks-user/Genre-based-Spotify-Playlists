import { modulePath } from "./constants";
import { session } from "./sessions";
import * as Configs from '@/configs'
import { Playlist } from "./types";

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

export async function createUserPlaylist(
    name: string, public_?: boolean, collaborative?: boolean, description?: string)
    : Promise<Playlist> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/users/${session.userProfile.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                public: public_ === undefined ? true : false,
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

export async function addSongsToPlaylist(playlistID: string, trackIDs: string[])
    : Promise<string> {
    try {
        const uris = trackIDs.map(id => {
            return `spotify:track:${id}`;
        });
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
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

export async function removeSongsFromPlaylist(playlistID: string, trackIDs: string[])
    : Promise<string> {
    try {
        const tracks = trackIDs.map(id => {
            return { uri: `spotify:track:${id}` };
        });

        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
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
    playlistID: string,
    name: string,
    description: string
): Promise<void> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
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

// export async function removeUserPlaylist(playlistID?: string): Promise<string> {
//     try {
//         const response = await fetch(
//             `https://api.spotify.com/v1/users/${session.userProfile.id}/playlists`, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `Bearer ${session.accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: name,
//                 public: public_ === undefined ? true : false,
//                 collaborative: collaborative === undefined ? false : true,
//                 description: description === undefined ?
//                     "Created by Playtify" : description
//             })
//         });
//         return await response.json();
//     } catch (error) {
//         throw Configs.createError(modulePath, arguments.callee.name, error);
//     }
// }