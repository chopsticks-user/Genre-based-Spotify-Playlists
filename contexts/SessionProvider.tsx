import { Session, UserProfile, getAccessToken, getUserProfile } from "@/spotify";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import { authDiscoveryDocument, authRequestConfigs } from "@/spotify/constants";

export type AuthPrompt =
    (options?: AuthSession.AuthRequestPromptOptions | undefined) =>
        Promise<AuthSession.AuthSessionResult>;

export const SessionContext = createContext<Session | null>(null);
export const InitializeSessionContext =
    createContext<() => Promise<boolean>>(async () => false);
export const AuthPromptContext = createContext<AuthPrompt | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
    const [req, res, prompt] = AuthSession.useAuthRequest(
        authRequestConfigs, authDiscoveryDocument);
    const [session, setSession] = useState<Session | null>(null);

    const initializeSession = async () => {
        try {
            const result = await prompt();

            if (result && result.type === 'success') {
                // TODO: add userDAO to session
                const authCode: string = result.params.code;
                const accessToken: string = await getAccessToken(authCode);
                const userProfile: UserProfile = await getUserProfile(accessToken);
                setSession({ accessToken, userProfile });
                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return (
        <SessionContext.Provider value={session}>
            <InitializeSessionContext.Provider value={initializeSession}>
                {children}
            </InitializeSessionContext.Provider>
        </SessionContext.Provider>
    );
};