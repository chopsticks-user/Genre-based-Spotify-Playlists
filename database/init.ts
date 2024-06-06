import { firebaseConfig } from "@/configs";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export function genreNameDB(genre: string): string {
    return genre.replaceAll(' ', '_');
}

export function genreNameUI(genre: string): string {
    return genre.replaceAll('_', ' ');
}