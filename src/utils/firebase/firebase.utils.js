import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCdHT-AYHXjF7wOrfAchX4PIm3cSj5tn14",
  authDomain: "crwn-db.firebaseapp.com",
  databaseURL: "https://crwn-db.firebaseio.com",
  projectId: "crwn-db",
  storageBucket: "crwn-db.appspot.com",
  messagingSenderId: "850995411664",
  appId: "1:850995411664:web:7ddc01d597846f65",
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log("error creating the user", error.message)
    }
  }
  return userDocRef
}
