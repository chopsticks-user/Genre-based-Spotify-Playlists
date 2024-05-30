import * as AuthSession from 'expo-auth-session';

export type PromptAsync = (options?: AuthSession.AuthRequestPromptOptions | undefined)
    => Promise<AuthSession.AuthSessionResult>;

export interface Image {
    url: string;
    height: number;
    width: number;
};

export interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content?: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: { spotify: string };
    followers?: { href: string; total: number; };
    href?: string;
    id: string;
    images: Image[];
    product?: string;
    type?: string;
    uri?: string;
};

export interface Session {
    accessToken: string;
    userProfile: UserProfile;
    ready: boolean;
};

export interface Artist {
    external_urls: { spotify: string };
    followers: { href: string, total: number };
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
};

export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    }
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: object;
    restrictions: { reason: string };
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
};

export interface Copyright {
    text: string;
    type: string;
};

export interface Episode {
    audio_preview_url: string | null;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point: {
        fully_played: boolean;
        resume_position_ms: number;
    };
    type: string;
    uri: string;
    restrictions: {
        reason: string;
    };
    show: {
        available_markets: string[];
        copyrights: Copyright[];
        descriptions: string;
        html_description: string;
        explicit: boolean;
        external_urls: { spotify: string };
        href: string;
        id: string;
        images: Image[];
        is_externally_hosted: boolean;
        languages: string[];
        media_type: string;
        name: string;
        publisher: string;
        type: string;
        uri: string;
        total_episodes: number;
    };
};

export interface TrackItem {
    addedAt: string;
    track: Track;
};

export interface PlaylistOwner {
    external_urls: { spotify: string };
    followers: { href: string, total: number };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string | null;
};

export interface SimplifiedUser {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
};

export interface SimplifiedArtist extends SimplifiedUser {
};

export interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: Image[];
    release_date: string;
    release_date_precision: string;
    restrictions: { reason: string };
    type: string;
    uri: string;
    artists: Artist[];
};

export interface PlaylistTrack {
    added_at: string;
    added_by: string;
    is_local: boolean;
    track: Track | Episode;
};

export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string };
    followers: { href: string, total: number };
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: PlaylistOwner;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: PlaylistTrack[];
    };
    type: string;
    uri: string;
};