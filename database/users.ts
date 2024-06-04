import {
    doc, getDoc, setDoc,
} from 'firebase/firestore';
import { db } from './init'
import { session } from '@/spotify/sessions';

export async function createUser(): Promise<void> {
    try {
        const userDocRef = doc(db, 'users', session.userProfile.id);
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            await setDoc(userDocRef, {
                playlists: [],
                tracks: [],
            });
        }

    } catch (error) {
        throw new Error(`@/database/createUser: ${error}`);
    }
}

