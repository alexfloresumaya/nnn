import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
import { initializeApp } from 'firebase/app';
import 'firebase/compat/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAl2gZHUF17U9ozYhzrIMBdpbDeDJzaqek",
  authDomain: "nnn-watch.firebaseapp.com",
  projectId: "nnn-watch",
  storageBucket: "nnn-watch.appspot.com",
  messagingSenderId: "503660623073",
  appId: "1:503660623073:web:475bd69de39410e154b3a0",
  measurementId: "G-R5X6B7R968",
};

export const firebases = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebases, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

if(!firebase.apps.lenght){
  firebase.initializeApp(firebaseConfig)
}
export {firebase};