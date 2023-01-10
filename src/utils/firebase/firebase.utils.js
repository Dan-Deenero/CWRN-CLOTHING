import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  // signInWithEmailAndPassword 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyARzAn3v4RDzT26Q1KIJ1oyJoIIl7ZDhdw",
  authDomain: "crwn-clothing-db-e3aa8.firebaseapp.com",
  projectId: "crwn-clothing-db-e3aa8",
  storageBucket: "crwn-clothing-db-e3aa8.appspot.com",
  messagingSenderId: "206277183470",
  appId: "1:206277183470:web:b44eeffbdd673dc37470ff"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };

export const auth = getAuth();
export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async( 
  userAuth,
  additionalInformation = {}
) =>{
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);


  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// export const signInAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;

//   return await signInWithEmailAndPassword(auth, email, password);
// };