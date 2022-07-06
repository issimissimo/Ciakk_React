import { useState, useEffect, useContext, useRef } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { AuthenticationContext } from "./components/AuthenticationProvider";

import { firebaseConfig } from "./utils/constants";
import { firebaseCredentials } from "./utils/constants";
import { checkBrowser } from "./utils/checkBrowser";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const OnLoadMessage = ({ message }) => {
  return (
    <div className="gradient-bg min-h-screen flex flex-col justify-center items-center">
      {message}
    </div>
  )
}

const AppStateEnum = {
  ERROR: Symbol("error"),
  LOADING: Symbol("loading"),
  WELCOME: Symbol("welcome"),
  MESSAGE: Symbol("message"),
  VIDEO: Symbol("video"),
  GREETINGS: Symbol("greetings")
}

const App = () => {

  const [appState, setAppState] = useState(AppStateEnum.LOADING);

  const [initState, setInitState] = useState({ browserCompatible: true, parametersAvailable: true, fileExist: true, loading: true });
  const { user, loading, error, Login, Logout } = useContext(AuthenticationContext);
  
  const parameters = useRef({
    userId: "",
    fileUiid: ""
  });

  const errorMessage = useRef({
    message: '',
    icon: ''
  })


  /// 1st time
  useEffect(() => {

    /// Check for browser compatibility
    const { isChrome, isSafari, isFirefox } = checkBrowser();
    if (!isChrome && !isSafari && !isFirefox) {
      setInitState((prevState) => ({ ...prevState, browserCompatible: false }));
      return;
    }

    /// Get userId & fileUiid from url parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    parameters.current.userId = urlParams.get('id');
    parameters.current.fileUiid = urlParams.get('uiid');

    if (parameters.current.userId == null || parameters.current.fileUiid == null) {
      // setInitErrors((prevState) => ({ ...prevState, parametersAvailable: false }));
      // return;

      /// TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      parameters.current.userId = 'e3eyUWxXwySPYvNIO9IKWG8T6U52';
      parameters.current.fileUiid = 'f0bbf517-10ed-44b7-8589-52a3bb954598';
    }

    /// Login
    if (!user) {
      LoginToApp();
    }
  }, []);


  /// On "user" changed
  useEffect(() => {
    if (user) {
      GetData();
    }
  }, [user])



  const LoginToApp = async () => {
    const { email, password } = firebaseCredentials;
    await Login(email, password);
  };



  const GetData = async () => {

    /// Check if document exist on firestore
    const docRef = doc(db, parameters.current.userId, parameters.current.fileUiid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      /// Check if video exist on storage
      const data = docSnap.data();
      const storageUrl = data.storageUrl;
      const storage = getStorage();
      const videoPath = `${parameters.current.userId}/${storageUrl}`;

      try {
        await getDownloadURL(ref(storage, videoPath));
        setInitState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        console.log("ERROR! Video not found!");
        setInitState((prevState) => ({ ...prevState, fileExist: false }));
      }




    } else {
      console.log("ERROR! Document not found!");
      setInitState((prevState) => ({ ...prevState, fileExist: false }));
    }
  }



  if (!initState.browserCompatible) {
    return (
      <OnLoadMessage message={
        <>
          <h1 className="text-2xl font-semibold text-center">Browser not suppported!</h1>
          <p className="mt-5 text-center">Please use <span className="font-semibold">Chrome - Safari - Firefox</span></p>
        </>
      } />
    )
  }

  if (error) {
    return (
      <OnLoadMessage message={
        <>
          <h1 className="text-2xl font-semibold text-center">Something went wrong loading the page</h1>
          <p className="mt-5 text-center">Please try again later</p>
        </>
      } />
    )
  }

  if (!initState.parametersAvailable) {
    return (
      <OnLoadMessage message={
        <>
          <h1 className="text-2xl font-semibold text-center">Parameteters not specified</h1>
        </>
      } />
    )
  }


  if (!initState.fileExist) {
    return (
      <OnLoadMessage message={
        <>
          <h1 className="text-2xl font-semibold text-center">This message has expired</h1>
        </>
      } />
    )
  }


  if (initState.loading || loading) {
    return (
      <OnLoadMessage message={
        <>
          <h1 className="text-2xl font-semibold text-center">Loading...</h1>
        </>
      } />
    )
  }


  return (
    <div className="gradient-bg min-h-screen">
      {
        user ? (
          <>
            <h1>{user.email}</h1>
            <button type="button" onClick={Logout}>Logout</button>
          </>
        ) : (
          <h1>No user</h1>
        )}
    </div>

  )
}

export default App
