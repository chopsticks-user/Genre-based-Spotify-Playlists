import * as AuthSession from 'expo-auth-session';
import { authRequestConfigs, authDiscoveryDocument } from './info';

export interface UserAuthSessionResult {
    request: AuthSession.AuthRequest | null,
    response: AuthSession.AuthSessionResult | null,
    promptAsync: (options?: AuthSession.AuthRequestPromptOptions | undefined)
        => Promise<AuthSession.AuthSessionResult>
}

export function userAuthSession(): UserAuthSessionResult | null {
    try {
        const [req, res, prompt] = AuthSession.useAuthRequest(
            authRequestConfigs, authDiscoveryDocument);
        return { request: req, response: res, promptAsync: prompt };
    } catch (err) {
        console.error("@/api/userAuth: " + err);
    }
    return null;
}