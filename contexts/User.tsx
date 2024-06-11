import { UserProfile, getUserProfile } from "@/spotify";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const UserContext = createContext<UserProfile | null>(null);
export const SetUserContext =
    createContext<React.Dispatch<React.SetStateAction<UserProfile | undefined>>>(
        () => { }
    );

export function UserProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<UserProfile>();

    useEffect(() => {
        getUserProfile()
            .then(user => setUser(user))
            .catch(error => console.error(error));
    }, []);

    return (
        <UserContext.Provider value={user as UserProfile}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    );
};