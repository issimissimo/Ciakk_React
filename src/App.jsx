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


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export const AppStateEnum = {
  ERROR: Symbol("error"),
  LOADING: Symbol("loading"),
  WELCOME: Symbol("welcome"),
  MESSAGE: Symbol("message"),
  VIDEO: Symbol("video"),
  GREETINGS: Symbol("greetings")
}


const App = () => {
  const [appState, setAppState] = useState(AppStateEnum.LOADING);
  const { user, loading, error, Login, Logout } = useContext(AuthenticationContext);

  const parameters = useRef({
    userId: "e3eyUWxXwySPYvNIO9IKWG8T6U52",
    fileUiid: "f0bbf517-10ed-44b7-8589-52a3bb954598"
  });

  const errorMsg = useRef({
    message: '',
    icon: ''
  })


  /// 1st time
  useEffect(() => {

    ///
    /// Check for browser compatibility
    ///
    const { isChrome, isSafari, isFirefox } = checkBrowser();

    if (!isChrome && !isSafari && !isFirefox) {

      errorMsg.current.message = <>
        <h1 className="text-2xl font-semibold text-center">Browser not suppported!</h1>
        <p className="mt-5 text-center">Please use <span className="font-semibold">Chrome - Safari - Firefox</span></p>
      </>;
      setAppState(AppStateEnum.ERROR);
      return;
    }


    // ///
    // /// Get userId & fileUiid from url parameters
    // ///
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const userId = urlParams.get('id');
    // const fileUiid = urlParams.get('uiid');

    // if (userId == null || fileUiid == null) {
    //   errorMsg.current.message = <>
    //     <h1 className="text-2xl font-semibold text-center">Browser not suppported!</h1>
    //     <p className="mt-5 text-center">Please use <span className="font-semibold">Chrome - Safari - Firefox</span></p>
    //   </>;
    //   setAppState(AppStateEnum.ERROR);
    //   return;
    // }

    // parameters.current.userId = userId;
    // parameters.current.fileUiid = fileUiid;


    /// Login
    if (!user) {
      LoginToApp();
    }
  }, []);


  /// On "user" changed (mainly called after Login)
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
      console.log(data)
      const storageUrl = data.storageUrl;
      const storage = getStorage();
      const videoPath = `${parameters.current.userId}/${storageUrl}`;

      try {
        await getDownloadURL(ref(storage, videoPath));
        setAppState(AppStateEnum.WELCOME);
      }
      catch (error) {
        console.log("ERROR! Video not found!");
        errorMsg.current.message = <h1 className="text-2xl font-semibold text-center">This message has expired</h1>;
        setAppState(AppStateEnum.ERROR);
      }




    } else {
      console.log("ERROR! Document not found!");
      errorMsg.current.message = <h1 className="text-2xl font-semibold text-center">This message has expired</h1>;
      setAppState(AppStateEnum.ERROR);
    }
  }



  // if (error) {
  //   return (
  //     <OnLoadMessage message={
  //       <>
  //         <h1 className="text-2xl font-semibold text-center">Something went wrong loading the page</h1>
  //         <p className="mt-5 text-center">Please try again later</p>
  //       </>
  //     } />
  //   )
  // }



  return (
    <div className="gradient-bg min-h-screen">
      {appState == AppStateEnum.LOADING && <Loader />}
      {appState == AppStateEnum.ERROR && <Error message={errorMsg.current.message} />}
      {appState == AppStateEnum.WELCOME && <Welcome />}
      {appState == AppStateEnum.MESSAGE && <Message />}
      {appState == AppStateEnum.VIDEO && <Video />}
      {appState == AppStateEnum.GREETINGS && <Greetings />}
    </div>
  )
}

export default App
