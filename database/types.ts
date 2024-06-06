export interface TrackDAO {
    id: string;
};

export interface PlaylistDAO {
    id: string;
    genre: string;
    tracks: TrackDAO[];
};

export interface UserDAO {
    playlists: PlaylistDAO[];
    tracks: TrackDAO[];
};

export interface RecommendationData {
    genres: string[];
    trackIDs: string[];
};
