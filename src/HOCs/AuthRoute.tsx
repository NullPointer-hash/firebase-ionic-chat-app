import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useFirebase } from "../providers/FirebaseProvider";
import { getAuth } from "firebase/auth";
import { useAuth } from "../providers/AuthProvider";

interface propTypes {
  component: any;
  path: string;
  to: string
  exact?: boolean;
}



const AuthRoute: React.FC<propTypes> = ({ component: Component, to, ...rest }) => {
  const {isAuth, firebaseApp} = useFirebase();
  const [authenticated, isAuthenticated] = useState(isAuth);
  

  useEffect(() => {
    isAuthenticated(isAuth)
  }, [isAuth]);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
            <Redirect to={to} />
        ) : (
            <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
