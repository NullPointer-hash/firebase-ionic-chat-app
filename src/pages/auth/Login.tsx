import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLoading } from "@ionic/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import { useFirebase } from "../../providers/FirebaseProvider";
import './Login.css';
import { Redirect } from "react-router";




const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>(false);
  const ctx = useFirebase();
  const firebaseApp: any = ctx.firebaseApp;
  const auth = getAuth(firebaseApp);

  function mapAuthCodeToMessage(authCode: string) {
    switch (authCode) {
      case "auth/wrong-password":
        return "The Password provided is incorrect";
  
      case "auth/invalid-email":
        return "The Email provided is invalid";
  
      // Many more authCode mapping here...
  
      default:
        return "";
    }
  }

  const login = async () => {
    setShowLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setAuthError(false);
      console.log(user);
    } catch (err: any) {
      setAuthError(true);
      setErrorMessage(mapAuthCodeToMessage(err.code))
      console.error(err.code);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex-center container">
          <div className="small-container flex-center">
            {
                authError ? 
                <p className="error-message mb-10">{errorMessage}</p>:
                ""
            }
            <IonInput className="input-fields mb-10 h-10" value={email} placeholder="Email" onIonChange={e => setEmail(e.detail.value!)} />
            <IonInput className="input-fields mb-10 h-10" value={password} type="password" placeholder="Password" onIonChange={e => setPassword(e.detail.value!)} />
            <IonButton className="login-button mb-10 h-10" onClick={login}>Login</IonButton>
            <div className="register-message">register over <a href="/register" className="register-link">here</a> if you dont have an account already</div>
            <IonLoading isOpen={showLoading} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default Login;