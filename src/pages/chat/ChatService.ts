import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";


export const sendMessage = async (firebaseApp:any, message: string) => {
    if(message.length > 0) {
        const auth = getAuth(firebaseApp);
        const db = getDatabase(firebaseApp);
        const user = auth.currentUser;
        if (!user) {
            console.error("User is not signed in");
            return;
        }
        try {
            const _ref = ref(db, "messages")
            const msg_id = push(_ref, {
                message,
                user: user.email,
                timestamp: Date.now()
            });
            return true;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
};
  
export const listenToMessages = (firebaseApp:any, callback: any) => {
    const db = getDatabase(firebaseApp);
    const _ref = ref(db, "messages")
    onValue(_ref, (snapshot) => {
        const messages: any[] = [];
        console.log("message update !!");
        snapshot.forEach(message => {
            messages.push(message.val());
        });
        callback(messages);
    });
};


