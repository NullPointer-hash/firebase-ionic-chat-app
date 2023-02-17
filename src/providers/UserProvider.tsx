import React, { createContext, useState, useEffect, useContext } from "react";
import { useFirebase } from "./FirebaseProvider";
import { getAuth } from "firebase/auth";

const UserContext = createContext<any>(null);

const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const firebaseApp: any = useFirebase();
    const auth = getAuth(firebaseApp);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user)
        } else {
            setUser(null)
        }
        });
        return () => unsubscribe();
    }, []);
  
    return (
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    );
};

const useUser = () => useContext(UserContext)

export { useUser, UserProvider };
  