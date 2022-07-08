/// React
import { useState, useEffect, useContext, useRef } from "react";

/// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

/// Components
import { AuthenticationContext } from "./components/AuthenticationProvider";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Welcome from "./components/Welcome";
import Message from "./components/Message";
import Video from "./components/Video";
import Greetings from "./components/Greetings";


/// Utils
import { firebaseConfig } from "./utils/constants";
import { firebaseCredentials } from "./utils/constants";
import { checkBrowser } from "./utils/checkBrowser";

/// Icons
import { TbMoodSad } from 'react-icons/tb';


/// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/// AppStateEnum
export const AppStateEnum = {
  ERROR: Symbol("error"),
  LOADING: Symbol("loading"),
  WELCOME: Symbol("welcome"),
  MESSAGE: Symbol("message"),
  VIDEO: Symbol("video"),
  GREETINGS: Symbol("greetings")
}


///
/// App
///
const App = () => {

  const {  } = useContext(AuthenticationContext);

  


  return (

    <Video />
    
  )
}

export default App
