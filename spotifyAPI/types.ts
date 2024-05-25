import * as AuthSession from 'expo-auth-session';

export type PromptAsync = (options?: AuthSession.AuthRequestPromptOptions | undefined)
    => Promise<AuthSession.AuthSessionResult>;

export interface UserImage {
    url: string;
    height: number;
    width: number;
}

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
    images: Array<UserImage>;
    product: string;
    type: string;
    uri: string;
};

export interface Session {
    accessToken: string;
    userProfile: UserProfile;
}