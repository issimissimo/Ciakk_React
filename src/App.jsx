/// React
import { useState, useEffect, useContext, useRef } from "react";

/// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";

/// Components
import { AuthenticationContext } from "./components/AuthenticationProvider";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Message from "./components/Message";
import Video from "./components/Video";
import Greetings from "./components/Greetings";


/// Utils
import { firebaseConfig } from "./utils/constants";
import { firebaseCredentials } from "./utils/constants";
import checkBrowser from "./utils/checkBrowser";
import checkIOS from "./utils/checkIOS";
import checkMobile from "./utils/checkMobile";
import { addDays, padTo2Digits, formatDate } from "./utils/dateUtils";


/// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions();


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

  /// Is iOS device?
  const iOS = useRef();

  /// Parameters injected by the URL
  const parameters = useRef({
    userId: "e3eyUWxXwySPYvNIO9IKWG8T6U52",
    fileUiid: "f0bbf517-10ed-44b7-8589-52a3bb954598"
    // userId: "",
    // fileUiid: ""
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


    /// Check for browser compatibility
    const { isChrome, isSafari, isFirefox } = checkBrowser();
    if (!isChrome && !isSafari && !isFirefox) {

      /// We can't proceed because the browser is not compatible
      errorMsg.current.message =
        <>
          <h1 className="text-1xl font-semibold text-center">This browser is not suppported</h1>
          <p className="mt-5 text-center">Please use <span className="font-semibold">Chrome - Safari - Firefox</span></p>
        </>;
      HandleChangeState(AppStateEnum.ERROR);
      return;
    }

    /// Check if we are running on iOS device
    iOS.current = checkIOS();


    // ///
    // /// Get userId & fileUiid from url parameters
    // ///
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const userId = urlParams.get('id');
    // const fileUiid = urlParams.get('uiid');

    // if (!userId || !fileUiid) {
    //   errorMsg.current.message = <>
    //     <h1 className="font-semibold text-center">Parameters not specified</h1>
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
        docData.videoDownloadUrl = videoDownloadUrl;


        /// Get profile picture URL
        const profileStorage = docData.profile;
        const storage1 = getStorage();
        const profilePath = `${parameters.current.userId}/${profileStorage}`;
        const profileDownloadUrl = await getDownloadURL(ref(storage1, profilePath));
        docData.profileDownloadUrl = profileDownloadUrl;


        /// Set expiration date in 7 days
        if (docData.expiration == null) {
          docData.expiration = formatDate(new Date(addDays(Date(), 7)));
          updateDoc(docRef, { expiration: docData.expiration });

          /// Schedule storage delete
          const storage_scheduleDelete = httpsCallable(functions, 'storage_scheduleDelete');
          storage_scheduleDelete({ videoPath: videoPath, profilePath: profilePath, timeOutInSeconds: 604800 }); /// 604800 seconds = 7 days
        }


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



  return (
    <>
      {appState == AppStateEnum.LOADING && <Loader />}
      {appState == AppStateEnum.ERROR && <Error message={errorMsg.current.message} />}
      {appState == AppStateEnum.MESSAGE && <Message data={data.current} onGoNext={() => { setAppState(AppStateEnum.VIDEO) }} />}
      {appState == AppStateEnum.VIDEO && <Video data={data.current} iOS={iOS.current} onGoNext={() => { setAppState(AppStateEnum.GREETINGS) }} />}
      {appState == AppStateEnum.GREETINGS && <Greetings data={data.current} />}
    </>
  )
}

export default App
