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

import Test from "./components/Test"


/// Utils
import { firebaseConfig } from "./utils/constants";
import { firebaseCredentials } from "./utils/constants";
import checkBrowser from "./utils/checkBrowser";


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



const PreloadImage = src => new Promise(function (resolve, reject) {
  const img = new Image();
  img.onload = function () {
    resolve(img);
  }
  img.onerror = reject;
  img.src = src;
});



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
      errorMsg.current.message =
        <>
          <h1 className="text-1xl font-semibold text-center">This browser is not suppported</h1>
          <p className="mt-5 text-center">Please use <span className="font-semibold">Chrome - Safari - Firefox</span></p>
        </>;
      HandleChangeState(AppStateEnum.ERROR);
      return;
    }

    /// Login
    if (!user) {
      LoginToApp();
    }
  }, []);


  /// On "user" changed (mainly called after Login)
  useEffect(() => {
    if (user) {
      if (!data.current) GetData();
      else HandleChangeState(AppStateEnum.MESSAGE);
    }
  }, [user])


  const HandleChangeState = (newState) => {
    setTimeout(() => {
      setAppState(newState);
    }, 200);
  }


  const LoginToApp = async () => {
    const { email, password } = firebaseCredentials;
    await Login(email, password);
  };

  useEffect(() => {
    console.log(appState)
  }, [appState])



  const GetData = async () => {

    /// Check if document exist on firestore
    const docRef = doc(db, parameters.current.userId, parameters.current.fileUiid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      /// Get data
      const docData = docSnap.data();

      /// Check if video exist on storage
      const videoStorage = docData.storageUrl;
      const storage = getStorage();
      const videoPath = `${parameters.current.userId}/${videoStorage}`;

      try {
        const videoDownloadUrl = await getDownloadURL(ref(storage, videoPath));
        console.log(videoDownloadUrl)
        docData.videoDownloadUrl = videoDownloadUrl;


        /// Get profile picture URL
        const profileStorage = docData.profile;
        const storage1 = getStorage();
        const profilePath = `${parameters.current.userId}/${profileStorage}`;


        const profileDownloadUrl = await getDownloadURL(ref(storage1, profilePath));
        docData.profileDownloadUrl = profileDownloadUrl;


        PreloadImage(profileDownloadUrl)
          .then(img => {

            /// Proceed to Welcome page
            data.current = docData;
            HandleChangeState(AppStateEnum.MESSAGE);

          })
          .catch(err => console.error("Failed", err))

      }
      catch (error) {
        console.log("ERROR! Video not found or Quota exceeded");
        errorMsg.current.message = <h1 className="text-sm font-semibold text-center">This video is expired<br></br> or quota is exceeded</h1>;
        HandleChangeState(AppStateEnum.ERROR);
      }
    } else {
      console.log("ERROR! Document not found");
      errorMsg.current.message = <h1 className="text-2xl font-semibold text-center">This message is expired</h1>;
      HandleChangeState(AppStateEnum.ERROR);
    }
  }




  // if (appState === AppStateEnum.LOADING) {
  //   console.log(1)
  //   return (
  //     <Loader />
  //   )
  // }
  // if (appState === AppStateEnum.MESSAGE) {
  //   console.log(2)
  //   return (
  //     <Message data={data.current} HandleChangeState={HandleChangeState} onClick={() => { setAppState(AppStateEnum.VIDEO) }} />
  //   )
  // }
  // if (appState === AppStateEnum.VIDEO) {
  //   console.log(3)
  //   return (
  //     <Test data={data.current} HandleChangeState={HandleChangeState} />
  //   )
  // }
  // else {
  //   return (
  //     <Test data={data.current} HandleChangeState={HandleChangeState} />
  //   )
  // }


  // return (
  //   <>
  //     {appState == AppStateEnum.LOADING && <Loader />}
  //     {appState == AppStateEnum.ERROR && <Error message={errorMsg.current.message}/>}
  //     {appState == AppStateEnum.WELCOME && <Welcome data={data.current} HandleChangeState={HandleChangeState} />}
  //     {appState == AppStateEnum.MESSAGE && <Message data={data.current} HandleChangeState={HandleChangeState} />}
  //     {appState == AppStateEnum.VIDEO && <Video data={data.current} HandleChangeState={HandleChangeState} />}
  //     {appState == AppStateEnum.GREETINGS && <Greetings data={data.current} />}
  //   </>
  // )

  return (
    <>
      {/* <button onClick={() => { setAppState(AppStateEnum.VIDEO) }}>CLICK</button> */}
      {appState == AppStateEnum.LOADING && <Loader />}
      {appState == AppStateEnum.ERROR && <Error message={errorMsg.current.message} />}
      {appState == AppStateEnum.WELCOME && <Welcome data={data.current} HandleChangeState={HandleChangeState} />}
      {appState == AppStateEnum.MESSAGE && <Message data={data.current} onGoNext={() => { setAppState(AppStateEnum.VIDEO) }} />}
      {appState == AppStateEnum.VIDEO && <Video data={data.current} HandleChangeState={HandleChangeState} />}
      {appState == AppStateEnum.GREETINGS && <Greetings data={data.current} />}
    </>
  )

  // return (
  //   <Test data={data.current} HandleChangeState={HandleChangeState} />
  // )
}

export default App
