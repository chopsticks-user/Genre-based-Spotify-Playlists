import * as AuthSession from 'expo-auth-session';
import { authRequestConfigs, authDiscoveryDocument } from './configs';
import * as configs from '@/configs'
import { PromptAsync, Session, UserProfile } from './types';

export const session = <Session>{};

export async function initializeSession(promptAsync: PromptAsync): Promise<void> {
    try {
        const result = await promptAsync();

        if (result && result.type === 'success') {
            const authCode: string = result.params.code;
            const accessToken: string = await getAccessToken(authCode);
            const userProfile: UserProfile = await getUserProfile(accessToken);

            session.accessToken = accessToken;
            session.userProfile = userProfile;
            console.log(session);
            return;
        }

    } catch (error) {
        console.error(error);
    }
}

export function createUserAuthPrompt(): PromptAsync {
    const [req, res, prompt] = AuthSession.useAuthRequest(
        authRequestConfigs, authDiscoveryDocument);
    return prompt;
}

export function getAuthCode(authSessionResult: AuthSession.AuthSessionResult): string {
    if (authSessionResult && authSessionResult.type === 'success') {
        return authSessionResult.params.code;
    }

    throw new Error(`${arguments.callee.name}: Failed to get authorization code. {authSessionResult} might not be valid`);
}

async function getAccessToken(authCode: string): Promise<string> {
    try {
        const url = 'https://accounts.spotify.com/api/token';
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic '
            + btoa(`${configs.clientID}:${configs.clientSecret}`));

        const body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${configs.redirectURI}`,
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        throw new Error(`${arguments.callee.name}: Failed to get access token.`);
    }

}

export async function getUserProfile(accessToken: string): Promise<UserProfile> {
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return await response.json();
    } catch (error) {
        throw error;
    }
}
