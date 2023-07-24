import { getApp, getApps, initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCXpUh-HKNvEqMWnNItcsyfhBZgD1JR3rk",
    authDomain: "resturantapp-sam.firebaseapp.com",
    databaseURL: "https://resturantapp-sam-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "resturantapp-sam",
    storageBucket: "resturantapp-sam.appspot.com",
    messagingSenderId: "245391989411",
    appId: "1:245391989411:web:38a225cdcc27cb7427fd16",
    measurementId: "G-97313G7SXH"
  };

const app = getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);

// firestore is the database
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage }; 