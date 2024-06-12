import {
    doc, getDoc, setDoc,
} from 'firebase/firestore';
import { db } from './init'
import { UserProfile } from '@/spotify';

export async function createUser(userProfile: UserProfile): Promise<boolean> {
    try {
        const userDocRef = doc(db, 'users', userProfile.id);
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            await setDoc(userDocRef, {
                playlists: [],
                tracks: [],
            });
            return false;
        }
        return true;
    } catch (error) {
        throw new Error(`@/database/createUser: ${error}`);
    }
}

