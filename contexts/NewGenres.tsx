import { PropsWithChildren, createContext, useState } from "react";

export const NewGenresContext = createContext<any>(null);

export function NewGenresProvider({ children }: PropsWithChildren) {
    const [newGenres, setNewGenres] = useState<string[]>([]);

    const value = { newGenres, setNewGenres };

    return (
        <NewGenresContext.Provider value={value}>
            {children}
        </NewGenresContext.Provider>
    );
};