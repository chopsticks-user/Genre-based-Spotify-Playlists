
export interface TrackDAO {
    id: string;
};

export interface PlaylistDAO {
    id: string;
    genres: string[];
    tracks: TrackDAO[];
};

export interface UserDAO {
    id: string;
    info: {
        spotifyID: string;
    };
    name: string;
    playlists: PlaylistDAO[];
};