import * as AuthSession from 'expo-auth-session';
import * as Configs from '@/configs'

export const authDiscoveryDocument: AuthSession.DiscoveryDocument = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export const authRequestConfigs: AuthSession.AuthRequestConfig = {
    clientId: Configs.clientID,
    redirectUri: Configs.redirectURI,
    usePKCE: false,
    scopes: [
        "user-read-private",
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
    ]
};