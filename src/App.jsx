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


///
/// App
///
const App = () => {
  const [appState, setAppState] = useState(AppStateEnum.LOADING);
  const { user, loading, error, Login, Logout } = useContext(AuthenticationContext);

  /// Parameters injected by the URL
  const parameters = useRef({
    userId: "e3eyUWxXwySPYvNIO9IKWG8T6U52",
    fileUiid: "f0bbf517-10ed-44b7-8589-52a3bb954598"
  });

  /// Error message
  const errorMsg = useRef({
    message: '',
    icon: ''
  });

  /// Data retrieved from the Database
  const data = useRef(null);


  /// 1st time
  useEffect(() => {

    ///
    /// Check for browser compatibility
    ///
    const { isChrome, isSafari, isFirefox } = checkBrowser();

    if (!isChrome && !isSafari && !isFirefox) {

      errorMsg.current.message = <>
        <h1 className="text-2xl font-semibold text-center">Your browser is not suppported</h1>
        <p className="mt-5 text-center">Please use <span className="font-semibold">Chrome - Safari - Firefox</span></p>
      </>;
      HandleChangeState(AppStateEnum.ERROR);
      return;
    }


    // ///
    // /// Get userId & fileUiid from url parameters
    // ///
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const userId = urlParams.get('id');
    // const fileUiid = urlParams.get('uiid');

    // if (!userId || !fileUiid) {
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
      if (!data.current) GetData();
      else HandleChangeState(AppStateEnum.WELCOME);
    }
  }, [user])



  const handleClick = (someData) => {
    console.log(someData);
  }



  const HandleChangeState = (newState) => {
    setTimeout(() => {
      setAppState(newState);
    }, 200);
  }


  const LoginToApp = async () => {
    const { email, password } = firebaseCredentials;
    await Login(email, password);
  };



  const GetData = async () => {

    console.log("Reading data...");

    /// Check if document exist on firestore
    const docRef = doc(db, parameters.current.userId, parameters.current.fileUiid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      /// Get data
      const docData = docSnap.data();
      data.current = docData;

      /// Check if video exist on storage
      const storageUrl = docData.storageUrl;
      const storage = getStorage();
      const videoPath = `${parameters.current.userId}/${storageUrl}`;

      try {
        await getDownloadURL(ref(storage, videoPath));
        HandleChangeState(AppStateEnum.WELCOME);
      }
      catch (error) {
        console.log("ERROR! Video not found");
        errorMsg.current.message = <h1 className="text-2xl font-semibold text-center">This message has expired</h1>;
        HandleChangeState(AppStateEnum.ERROR);
      }




    } else {
      console.log("ERROR! Document not found");
      errorMsg.current.message = <h1 className="text-2xl font-semibold text-center">This message has expired</h1>;
      HandleChangeState(AppStateEnum.ERROR);
    }
  }

console.log(appState)


  return (
    <div className="gradient-bg min-h-screen px-10">
      {appState == AppStateEnum.LOADING && <Loader />}
      {appState == AppStateEnum.Error && <Error />}
      {appState == AppStateEnum.WELCOME && <Welcome data={data.current} HandleChangeState={HandleChangeState} />}
      {appState == AppStateEnum.MESSAGE && <Message data={data.current} HandleChangeState={HandleChangeState} />}
      {appState == AppStateEnum.VIDEO && <Video />}
      {appState == AppStateEnum.GREETINGS && <Greetings />}
    </div>
  )
}

export default App
