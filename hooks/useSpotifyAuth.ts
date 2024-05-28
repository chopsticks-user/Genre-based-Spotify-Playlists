import { createUserAuthSession } from '@/spotify/sessions'

export type SpotifyAuthSession = () => Promise<boolean>;

export function useSpotifyAuth(): SpotifyAuthSession {
    return createUserAuthSession();
}