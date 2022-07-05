import { useState, useEffect, useContext } from "react";

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


const App = () => {

  const [initState, setInitState] = useState({ browserCompatible: true, parametersAvailable: true, fileExist: true, loading: true });
  const { user, loading, error, Login, Logout } = useContext(AuthenticationContext);


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
    let userId = urlParams.get('id');
    let fileUiid = urlParams.get('uiid');

    if (userId == null || fileUiid == null) {
      // setInitErrors((prevState) => ({ ...prevState, parametersAvailable: false }));
      // return;

      /// TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      userId = 'e3eyUWxXwySPYvNIO9IKWG8T6U52';
      fileUiid = 'f0bbf517-10ed-44b7-8589-52a3bb954598';
    }


    if (!user) {
      LoginToApp(userId, fileUiid);
    }
    else {
      GetData(userId, fileUiid);
    }
  }, []);



  const LoginToApp = async (userId, fileUiid) => {
    const { email, password } = firebaseCredentials;
    const res = await Login(email, password);
    // console.log(res)

    GetData(userId, fileUiid);
  };



  const GetData = async (userId, fileUiid) => {

    /// Check if document exist on firestore
    const docRef = doc(db, userId, fileUiid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      /// Check if video exist on storage
      const data = docSnap.data();
      const storageUrl = data.storageUrl;
      const storage = getStorage();
      const videoPath = `${userId}/${storageUrl}`;
      getDownloadURL(ref(storage, videoPath))
        .then((url) => {

          /// Set loading finished
          setInitState((prevState) => ({ ...prevState, loading: false }));
        })
        .catch((error) => {
          console.log(error)
          setInitState((prevState) => ({ ...prevState, fileExist: false }));
        });












      // if(checkUrl(downloadUrl)){
      //   console.log("SIIII")
      // }
      // else{
      //   console.log("NOOO")
      // }




      // if (data.expiration == null) {
      //   /// Set the expiration in 7 days
      //   var futureDate = new Date(addDays(Date(), 7));
      //   data.expiration = formatDate(futureDate).toString();
      //   console.log("Setting expiration date to: " + data.expiration);
      //   updateDoc(docRef, { expiration: data.expiration }).then(() => {
      //     UI.Setup(data);
      //   })
      // }
      // else {
      //   UI.Setup(data);
      // }
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
