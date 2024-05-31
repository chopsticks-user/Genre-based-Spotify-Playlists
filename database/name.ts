import { collection, getDocs } from 'firebase/firestore';
import { db } from './init'
import { PlaylistDAO, UserDAO } from './types';

export async function getName() {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`${doc.id} => ${data.playlists[0].genres.length}`);
    });
}
