import React, { createContext, useState, useEffect, useContext } from "react";
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'firebase/app';
import { deleteApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

console.log("?. FirebaseProvider FILE")
// Create a context for the FirebaseApp instance
const FirebaseContext = createContext<{firebaseApp:FirebaseApp | null, isAuth: Boolean}>({
  firebaseApp:null,
  isAuth: false,
});

// Create a context provider component
const FirebaseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [authenticated, setAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    const app = firebase.initializeApp({
      // YOUR FIREBASE CONFIGURATION INFO
    });
    console.log("1. FirebaseProvider logging firebase state: ", firebaseApp)
    console.log("2. FirebaseProvider logging firebase app: ", app)

    if(!firebaseApp) {
      setFirebaseApp(app);
      console.log("3. FirebaseProvider firebase app state set: ", firebaseApp)
    }
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
          setAuthenticated(true);
      } else {
          setAuthenticated(false);
      }
    });
    console.log("4. FirebaseProvider IsAuth state is set: ", authenticated)

    return () => {
      deleteApp(app)
        .then(function() {
          console.log("App deleted successfully");
        })
        .catch(function(error) {
          console.log("Error deleting app:", error);
        });
    };
  }, []);

  return (
    <FirebaseContext.Provider value={{firebaseApp, isAuth: authenticated}}>
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => useContext(FirebaseContext)

export { useFirebase, FirebaseProvider };
