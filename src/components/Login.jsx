
import { useContext } from "react";

import { AuthenticationContext } from "./AuthenticationProvider";

const Login = () => {
    const { user, loading, error } = useContext(AuthenticationContext);

    return (
        <div>
            {
                user ? (
                    <h1>USER</h1>
                ) : (
                    <h1>No user</h1>
                )}
        </div>
    )
}

export default Login;