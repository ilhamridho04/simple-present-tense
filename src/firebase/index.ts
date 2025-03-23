import {FirebaseOptions, initializeApp} from 'firebase/app';
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {getFirestore, collection, addDoc} from 'firebase/firestore';

let {VITE_FIREBASE_CONFIG, PROD} = import.meta.env;

const firebaseConfig: FirebaseOptions = VITE_FIREBASE_CONFIG
    ? JSON.parse(VITE_FIREBASE_CONFIG)
    : {apiKey: 'MOCK_KEY'};

const app = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
const db = getFirestore(app);

export {firebaseAuth, db};

// if (!PROD) {
//     connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
// }
