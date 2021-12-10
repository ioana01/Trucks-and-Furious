import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import "firebase/compat/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCm7jvVbOF49pUsg_6W3zLOBegHVrEhTWs",
    authDomain: "trucks-and-furious.firebaseapp.com",
    projectId: "trucks-and-furious",
    storageBucket: "trucks-and-furious.appspot.com",
    messagingSenderId: "257488090780",
    appId: "1:257488090780:web:51843c31fc646659339f59",
    databaseURL: 'https://trucks-and-furious-default-rtdb.europe-west1.firebasedatabase.app/'
})

export const auth = app.auth()
export const database = app.database()
export default app