import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
const config={
    apiKey: "AIzaSyCbLsLI0uFO3ITRTvL1Do6ZlCVvlrRC8OQ",
    authDomain: "chat-web-app-2abaa.firebaseapp.com",
    projectId: "chat-web-app-2abaa",
    storageBucket: "chat-web-app-2abaa.appspot.com",
    messagingSenderId: "29404721089",
    appId: "1:29404721089:web:2a210bb729b2f1242a0940"
  };

  const app=firebase.initializeApp(config);
  export const auth=app.auth()
  export const database=app.database()
