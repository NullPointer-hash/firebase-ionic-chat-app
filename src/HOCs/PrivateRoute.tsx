import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useFirebase } from "../providers/FirebaseProvider";
import { getAuth } from "firebase/auth";
import { useAuth } from "../providers/AuthProvider";

interface propTypes {
  component: any;
  path: string;
  exact?: boolean;
}



const PrivateRoute: React.FC<propTypes> = ({ component: Component, ...rest }) => {
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
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
