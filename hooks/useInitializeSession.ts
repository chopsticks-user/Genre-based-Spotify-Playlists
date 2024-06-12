import { InitializeSessionContext } from "@/contexts/SessionProvider";
import { useContext } from "react";


export default function useInitializeSession() {
    return useContext(InitializeSessionContext);
}