import {
    DocumentData, DocumentReference, addDoc, arrayUnion,
    collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc,
    where
} from 'firebase/firestore';
import { app, db } from './init'
import {
    DocumentRef, PlaylistDAO, TrackGroup, UserDAO, Document, TrackDAO
} from './types';
import { session } from '@/spotify';

export async function createUser(): Promise<void> {
    try {
        const userDocRef = doc(db, 'users', session.userProfile.id)
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            await setDoc(userDocRef, {
                playlists: [],
            });
        }

        // return userDocRef;
    } catch (error) {
        throw new Error(`@/database/createUser: ${error}`);
    }
}

