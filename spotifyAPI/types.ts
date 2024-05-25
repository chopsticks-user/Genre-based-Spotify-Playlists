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
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: { spotify: string };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Array<Image>;
    product: string;
    type: string;
    uri: string;
};

export interface Session {
    accessToken: string;
    userProfile: UserProfile;
};

export interface Artist {
    external_urls: { spotify: string };
    followers: { href: string, total: number };
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<Image>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
};

export interface Track {
    album: any;
    artists: Array<Artist>;
    available_markets: Array<string>;
    id: string;
    name: string;
    popularity: number;
};

export interface TrackItem {
    addedAt: string;
    track: Track;
};