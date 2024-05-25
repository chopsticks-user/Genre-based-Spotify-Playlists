import * as configs from '@/configs'

// export function getToken(): string {
//     return getAccessToken();
// }

var accessToken: string | null = null;

// export function getAccessToken(): string | null {
//     // TODO: token expired check
//     if (accessToken !== null) {
//         return accessToken;
//     }

//     requestAccessToken().then((res) => {
//         accessToken = res;
//     }).catch((err) => {
//         console.error(`@/spotifyAPI/getAccessToken: ${err}`);
//     });

//     return accessToken;
// }

export async function getAccessToken(authCode: string): Promise<string> {
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

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    return data.access_token;
}
