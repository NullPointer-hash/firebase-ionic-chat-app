import React, { createContext, useState, useEffect, useContext } from "react";
import * as firebase from 'firebase/app';
import { useFirebase } from "./FirebaseProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";

console.log("?. AuthProvider FILE")
const AuthContext = createContext<any>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<Boolean>(false);
    // const firebaseApp: any = useFirebase();
    // console.log("1. AuthProvider logging firebase app:", firebaseApp);
    // const auth = getAuth(firebaseApp);
    // console.log("2. AuthProvider logging AUTH:", auth);

    useEffect(() => {
        console.log("?. AuthProvider use effect")
        const app = firebase.initializeApp({
            apiKey: "AIzaSyAMGbepKBYPm4-LhRpFj8BRSIolMP-HMBE",
            authDomain: "chat-app-6144d.firebaseapp.com",
            databaseURL: "https://chat-app-6144d-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "chat-app-6144d",
            storageBucket: "chat-app-6144d.appspot.com",
            messagingSenderId: "950238756545",
            appId: "1:950238756545:web:f5f44a37714a69ee4f5e40"
        });
        console.log("0. AuthProvider logging firebase app: ", app)
        const auth = getAuth(app);
        console.log("2. AuthProvider logging AUTH:", auth);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        });
    }, []);
  
    return (
      <AuthContext.Provider value={authenticated}>
        {children}
      </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
  