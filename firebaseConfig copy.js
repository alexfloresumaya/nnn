import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Optionally import the services that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAl2gZHUF17U9ozYhzrIMBdpbDeDJzaqek",
  authDomain: "nnn-watch.firebaseapp.com",
  projectId: "nnn-watch",
  storageBucket: "nnn-watch.appspot.com",
  messagingSenderId: "503660623073",
  appId: "1:503660623073:web:475bd69de39410e154b3a0",
  measurementId: "G-R5X6B7R968",
};
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export async function getCities(db) {
  const usuariosCol = collection(db, 'usuarios');
  const citySnapshot = await getDocs(usuariosCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}