import * as AuthSession from 'expo-auth-session';
import { authRequestConfigs, authDiscoveryDocument } from './configs';

export interface UserAuthSessionInfo {
    request: AuthSession.AuthRequest | null,
    response: AuthSession.AuthSessionResult | null,
    promptAsync: (options?: AuthSession.AuthRequestPromptOptions | undefined)
        => Promise<AuthSession.AuthSessionResult>
}

export type AccessToken = string | null;

export let accessToken: AccessToken;

export function createUserAuthSession(): UserAuthSessionInfo | null {
    try {
        const [req, res, prompt] = AuthSession.useAuthRequest(
            authRequestConfigs, authDiscoveryDocument);
        return { request: req, response: res, promptAsync: prompt };
    } catch (err) {
        console.error("@/api/userAuthSession: " + err);
        return null;
    }
}

export function getAuthCode(userAuthSessionInfo: UserAuthSessionInfo | null)
    : string {
    if (userAuthSessionInfo === null) {
        return "";
    }

    const userAuthSessionResponse = userAuthSessionInfo.response;
    if (userAuthSessionResponse && userAuthSessionResponse.type === 'success') {
        return userAuthSessionResponse.params.code;
    }
    return "";
}
