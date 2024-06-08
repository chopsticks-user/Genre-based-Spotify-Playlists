export interface TrackDAO {
    id: string;
};

export interface PlaylistDAO {
    id: string;
    name: string,
    genre: string;
    tracks: TrackDAO[];
    description: string | null,
    imageURI: string | null,
    url: string,
};

export interface UserDAO {
    playlists: PlaylistDAO[];
    tracks: TrackDAO[];
};

export interface RecommendationData {
    genres: string[];
    trackIDs: string[];
};
