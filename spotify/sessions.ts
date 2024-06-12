import { modulePath } from './constants';
import * as Configs from '@/configs'
import { UserProfile } from './types';

export async function getAccessToken(authCode: string): Promise<string> {
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

export async function getUserProfile(accessToken: string): Promise<UserProfile> {
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        console.log('getUserProfile');

        if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 1000;

            throw new Error(`Spotify API Rate limited. Retrying after ${delay / 1000} seconds...`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}
