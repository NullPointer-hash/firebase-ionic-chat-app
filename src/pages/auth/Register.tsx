import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLoading } from "@ionic/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useFirebase } from "../../providers/FirebaseProvider";
import './Register.css';



const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [confirmationError, setConfirmationError] = useState(false);
    const ctx = useFirebase();
    const firebaseApp: any = ctx.firebaseApp;
    const auth = getAuth(firebaseApp);

    const register = async () => {
        setShowLoading(true);
        try {
            if (confirmPassword === password) {
                setConfirmationError(false);
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                console.log(user);
            } else {
                setConfirmationError(true);
            }
               
        } catch (err) {
            console.error(err);
        } finally {
            setShowLoading(false);
        }
    };

    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle>Register</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div className="flex-center container">
                <div className="small-container flex-center">
                    {
                        confirmationError ? 
                        <p className="error-message mb-10">make sure that the confirmation matches the password</p>:
                        ""
                    }
                    <IonInput className="input-fields mb-10 h-10" value={email} placeholder="Email" onIonChange={e => setEmail(e.detail.value!)} />
                    <IonInput className="input-fields mb-10 h-10" value={password} type="password" placeholder="Password" onIonChange={e => setPassword(e.detail.value!)} />
                    <IonInput className="input-fields mb-10 h-10" value={confirmPassword} type="password" placeholder="Confirm Password" onIonChange={e => setConfirmPassword(e.detail.value!)} />
                    <IonButton className="register-button mb-10 h-10" onClick={register}>Register</IonButton>
                    <div className="login-message">you can login over <a href="/login" className="login-link">here</a> if you already have an account</div>
                    <IonLoading isOpen={showLoading} />
                </div>
            </div>
        </IonContent>
        </IonPage>
    );
};
  
export default Register;