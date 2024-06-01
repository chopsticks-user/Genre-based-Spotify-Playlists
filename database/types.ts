
export interface TrackDAO {
    spotifyID: string;
};

export interface PlaylistDAO {
    spotifyID: string;
    genres: string[];
    tracks: TrackDAO[];
};

export interface UserDAO {
    playlists: PlaylistDAO[];
};