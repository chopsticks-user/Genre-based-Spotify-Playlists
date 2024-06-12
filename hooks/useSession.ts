import { SessionContext } from "@/contexts/SessionProvider";
import { Session } from "@/spotify";
import { useContext } from "react";

export default function useSession(): Session {
    // TODO: add type checking
    const session = useContext(SessionContext);
    return session as Session;
} 