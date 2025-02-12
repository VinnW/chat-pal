import './signUp.css'
import { Link } from 'react-router-dom';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import googleLogo from './assets/google-logo.png';
import facebookLogo from './assets/facebook-logo.png';
import io from 'socket.io-client'

const socket = io("http://localhost:8090")

// Firebase Frontend Google Auth Setup
const firebaseConfig = {
  apiKey: "AIzaSyA5UmCUbFvEQSnk9OW7kp7s2blmkTnYvMM",
  authDomain: "chat-pal-1801e.firebaseapp.com",
  databaseURL: "https://chat-pal-1801e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-pal-1801e",
  storageBucket: "chat-pal-1801e.firebasestorage.app",
  messagingSenderId: "251115933491",
  appId: "1:251115933491:web:6f1a691cca4e6c22a23846",
  measurementId: "G-5DMB3Z95K5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// Firebase Frontend Google Auth Setup

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try{
    const result = await signInWithPopup(auth, provider);

    if(result != null){
      const idToken = result.user.getIdToken();
      const gmail = result.user.email;
      const userName = result.user.displayName;
      
      socket.emit("login_register_user", userName, gmail);
      console.log(userName);
      console.log(gmail);
      console.log(idToken);
      window.location.href = '/chat';
    }
  }
  catch(error){
    console.log(error);
  }
}

function signUpPage(){
  return(
    <>
      <h1 className='app-title'>Welcome to Chat App!</h1>
      <h2 className='guide-text'>To get started, please choose one of the following sign-up options</h2>

      <div className='sign-up-container'>

        <div className='google-container'>
          <img className='google-logo' src={googleLogo} alt='Google'></img>
            <button onClick={() => signInWithGoogle()} className='google-btn'>Sign up with Google</button>
        </div>

        <div className='facebook-container'>
          <img className='facebook-logo' src={facebookLogo} alt='Facebook'></img>
          <Link to='/chat'>
            <button className='facebook-btn'>Sign up with Facebook</button>
          </Link>
        </div>

      </div>
    </>
  );
}

export default signUpPage