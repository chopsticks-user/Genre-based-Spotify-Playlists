import * as AuthSession from 'expo-auth-session';
import { authDiscoveryDocument, authRequestConfigs, modulePath } from './constants';
import * as Configs from '@/configs'
import { PromptAsync, Session, UserProfile } from './types';

export const session = <Session>{};

"use strict";

async function initializeSession(promptAsync: PromptAsync): Promise<boolean> {
    try {
        const result = await promptAsync();

        if (result && result.type === 'success') {
            const authCode: string = result.params.code;
            const accessToken: string = await getAccessToken(authCode);
            session.accessToken = accessToken;


            const userProfile: UserProfile = await getUserProfile();
            session.userProfile = userProfile;
            return true;
        }

        return false;
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

function getAuthCode(authSessionResult: AuthSession.AuthSessionResult): string {
    if (authSessionResult && authSessionResult.type === 'success') {
        return authSessionResult.params.code;
    }

    throw Configs.createError(modulePath, arguments.callee.name,
        "Failed to get authorization code. {authSessionResult} might not be valid`"
    )
}

async function getAccessToken(authCode: string): Promise<string> {
    try {
        const url = 'https://accounts.spotify.com/api/token';
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic '
            + btoa(`${Configs.clientID}:${Configs.clientSecret}`));

        const body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${Configs.redirectURI}`,
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}

export function createUserAuthSession() {
    const [req, res, prompt] = AuthSession.useAuthRequest(
        authRequestConfigs, authDiscoveryDocument);

    return async () => await initializeSession(prompt);
}

export async function getUserProfile(): Promise<UserProfile> {
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
            }
        });

        if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 1000;

            console.warn(`Rate limited. Retrying after ${delay} ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return getUserProfile();
        }

        return await response.json();
    } catch (error) {
        throw Configs.createError(modulePath, arguments.callee.name, error);
    }
}
