
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyABKHD7R2SkaEr4VWQG9cOk3f92AUnYMMM",
  authDomain: "react-js-website.firebaseapp.com",
  projectId: "react-js-website",
  storageBucket: "react-js-website.appspot.com",
  messagingSenderId: "693207118769",
  appId: "1:693207118769:web:748b946629628bf6cc4390"
};

const app = initializeApp(firebaseConfig);

//google auth
const provider=new GoogleAuthProvider();
const auth=getAuth();

export const authWithGoogle= async()=>{
    let user=null;
    await signInWithPopup(auth,provider)
    .then((result)=>{
        user=result.user
    })
    .catch(err=>console.log(err))
    return user

}