import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  IonFooter
} from "@ionic/react";
import { listenToMessages, sendMessage } from "./ChatService";
import { useFirebase } from "../../providers/FirebaseProvider";
import { getAuth, signOut } from "firebase/auth";
import ChatBubble from "../../components/chat/ChatBubble";
import './Chat.css';



const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const messagesEndRef = useRef<any>();
  const ctx = useFirebase();
  const firebaseApp: any = ctx.firebaseApp;
  const auth = getAuth(firebaseApp);
  
  const scrollToDiv = () => {
    const scrollToIt = document.getElementById('scroll-to-me');
    scrollToIt?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {

    listenToMessages(firebaseApp, (receivedMessages: any) => {
      setMessages(receivedMessages);
      scrollToDiv();
    });

  }, []);

  const handleSendMessage = () => {
    sendMessage(firebaseApp, message);
    setMessage("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Group Chat</IonTitle>
        </IonToolbar>
        <IonButton onClick={e => signOut(auth)}>logout</IonButton>
      </IonHeader>
      <IonContent scrollEvents={true}>
        <IonList className="chat-list" lines="none">
          {messages.map((msg:any, index) => {
            const isOwnMessage = msg.user === auth.currentUser?.email;
            return (
              <IonItem key={index} >
                <ChatBubble 
                  message={msg.message} 
                  type={ isOwnMessage ? "right" : "left" } 
                  username={ isOwnMessage ? "You" : msg.user.split('@')[0] } />
              </IonItem>
            );
          })}
          <IonItem id="scroll-to-me" key={1000} style={{ height:"20px" }}>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        
        <IonToolbar>
          <IonTextarea
            placeholder="Enter your message"
            value={message}
            onIonChange={e => setMessage(e.detail.value!)}
            className="message-area"
          />
          <IonButton onClick={handleSendMessage}>Send</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
