import { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "./components/AuthenticationProvider";

import { firebaseCredentials } from "./utils/constants";
import { checkBrowser } from "./utils/checkBrowser";



const App = () => {
  const [browserError, setBrowserError] = useState(true);
  const { user, loading, error, Login, Logout } = useContext(AuthenticationContext);


  useEffect(() => {
    const { isChrome, isSafari, isFirefox } = checkBrowser();
    if (!isChrome && !isSafari && !isFirefox) {
      setBrowserError(true);
      return;
    }

    if (!user) {
      const { email, password } = firebaseCredentials;
      Login(email, password);
    }
  }, []);


  if (browserError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Please use one of these browsers: <br /> Chrome - Safari - Firefox</p>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    )
  }


  return (
    <div>
      {
        user ? (
          <>
            <h1>USER</h1>
            <button type="button" onClick={Logout}>Logout</button>
          </>
        ) : (
          <h1>No user</h1>
        )}
    </div>

  )
}

export default App
