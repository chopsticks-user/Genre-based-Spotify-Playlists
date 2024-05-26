import { createUserAuthSession } from '@/spotify/sessions'

export type SpotifyAuthSession = () => Promise<void>;

export function useSpotifyAuth(): SpotifyAuthSession {
    return createUserAuthSession();
}