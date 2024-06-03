import { session } from "@/spotify/sessions";


export default function useUserProfile() {
    return session.userProfile;
}