import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAiu_2HSMfUieNjKVvFL1zIGZgpFCwFLz4",
    authDomain: "olx-project-25f78.firebaseapp.com",
    projectId: "olx-project-25f78",
    storageBucket: "olx-project-25f78.appspot.com",
    messagingSenderId: "836193132797",
    appId: "1:836193132797:web:cce133f1efbe5940ef5e94",
    measurementId: "G-N5L1MNWXF7"
  };

  export default firebase.initializeApp(firebaseConfig)