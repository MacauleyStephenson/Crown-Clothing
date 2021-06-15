import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAgPXLIhEsJ4LkULq-hFOlVsmiUh7gqLqo",
    authDomain: "crown-db-6437f.firebaseapp.com",
    projectId: "crown-db-6437f",
    storageBucket: "crown-db-6437f.appspot.com",
    messagingSenderId: "788374848464",
    appId: "1:788374848464:web:a352c734304855f88cefd5"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
    
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
          })
    } catch(error){
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;