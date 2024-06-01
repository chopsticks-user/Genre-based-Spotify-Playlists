import { DocumentData, DocumentReference, addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { app, db } from './init'
import { PlaylistDAO, UserDAO } from './types';

async function userExists(
    userDocRef: DocumentReference<DocumentData, DocumentData>
): Promise<boolean> {
    try {
        const userSnapshot = await getDoc(userDocRef);
        return userSnapshot.exists();
    } catch (error) {
        throw new Error(`@/database/userExists: ${error}`);
    }
}

export async function createUser(id: string): Promise<void> {
    try {
        const userDocRef = doc(db, 'users', id);

        if (await userExists(userDocRef)) {
            console.log('@/database/createUser: User already exists');
            return;
        }

        await setDoc(userDocRef, { playlists: [] });
        console.log('@/database/createUser: User created');
    } catch (error) {
        throw new Error(`@/database/createUser: ${error}`);
    }
}

export async function addUserPlaylists(
    id: string, playlists: any[]
): Promise<void> {
    try {
        const userDocRef = doc(db, 'users', id);
        await updateDoc(userDocRef, {
            playlists: arrayUnion(...playlists),
        });
    } catch (error) {
        throw new Error(`@/database/addUserPlaylists: ${error}`);
    }
}

export async function getUserPlaylists(id: string): Promise<any[]> {
    try {
        const userDocRef = doc(db, 'users', id);

        const userData = (await getDoc(userDocRef)).data();
        if (userData === undefined) {
            throw new Error(
                '@/database/getUserPlaylists: failed to get user playlists, user might not exist');
        }

        return userData?.playlists;
    } catch (error) {
        throw new Error(`@/database/getUserPlaylists: ${error}`);
    }
}

// export async function getUserID(spotifyID: string) {
//     try {
//         const q = query(collection(db, 'users'),
//             where('spotifyID', '==', spotifyID));
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.empty) {
//             return createUser(spotifyID);
//         }
//         // querySnapshot.forEach((doc) => {
//         //     console.log(`${doc.id} => ${doc.data()}`);
//         // });
//         return querySnapshot.docs[0].id;
//     } catch (error) {
//         console.log(`@/database/getUserID: ${error}`);
//     }
// }
