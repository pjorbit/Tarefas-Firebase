import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDhm2XrDF2Ap3Mx47vrkDn3qZXvH3BJqqw",
    authDomain: "app-firebase-394ea.firebaseapp.com",
    projectId: "app-firebase-394ea",
    storageBucket: "app-firebase-394ea.appspot.com",
    messagingSenderId: "245399185699",
    appId: "1:245399185699:web:f6a02fe07aee3b57724496",
    measurementId: "G-P7294BJPNN"
};

//inicializa o firebase passando as configurações presentes no 'firebaseConfig'
const firebaseapp = initializeApp(firebaseConfig);

//inicializa o bando de dados passando pra ele a variável 'firebaseapp'
const db = getFirestore(firebaseapp);
//incializa a autenticação passando pra ele a variável 'firebaseapp'
const auth = getAuth(firebaseapp);

export { db, auth };