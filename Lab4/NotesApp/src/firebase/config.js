import { firebase } from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDs_ivl4zpj5S7VnQ7PiHtXgM4JnSxnesg",
    authDomain: "lab434-f3053.firebaseapp.com",
    projectId: "lab434-f3053",
    storageBucket: "lab434-f3053.firebasestorage.app",
    messagingSenderId: "1074640020146",
    appId: "1:1074640020146:android:8ae0511744e521fefadfab"
  });
}

export { firebase }; 