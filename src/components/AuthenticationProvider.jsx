import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";

import { useEffect, useState, createContext } from "react";

import { firebaseConfig } from "../utils/constants";




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


/// AuthenticationContext
export const AuthenticationContext = createContext();


/// AuthenticationProvider
const AuthenticationProvider = ({ children }) => {

    const [user, loading, error] = useAuthState(auth);
    const [formData, setFormData] = useState({ email: '', password: '', userName: '' });


    /// Authenticate with Google
    const LoginWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            // const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        } catch (err) {
            console.error(err);
        }
    };


    /// Authenticate with Email and Password
    const Login = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };


    /// Register with Email and Password
    const Register = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const _user = res.user;
            await addDoc(collection(db, "users"), {
                uid: _user.uid,
                name,
                authProvider: "local",
                email,
            });
        } catch (err) {
            console.error(err);
        }
    };


    /// Send email to reset password
    const ResetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!");
        } catch (err) {
            console.error(err);
        }
    };


    /// Logout
    const Logout = () => {
        signOut(auth);
    };


    return (
        <AuthenticationContext.Provider value=
            {{
                formData, user, loading, error, Login, LoginWithGoogle,
                Register, ResetPassword, Logout
            }}>
            {children}
        </AuthenticationContext.Provider>
    )


}

export default AuthenticationProvider;