import { initializeApp, FirebaseApp } from "firebase/app";
import { firebaseConfig } from "@/configs";

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

