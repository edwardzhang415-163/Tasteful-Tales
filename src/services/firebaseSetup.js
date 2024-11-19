import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth , getReactNativePersistence} from 'firebase/auth'
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_apiKey,
  authDomain: process.env.EXPO_PUBLIC_API_authDomain,
  projectId: process.env.EXPO_PUBLIC_API_projectId,
  storageBucket: process.env.EXPO_PUBLIC_API_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_API_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_API_appId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)});