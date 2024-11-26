import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'

// Add Firebase products that you want to use
//import { getAuth } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxdRi9F9iyKaNE2u78ecQvy3WxNSPDmW4",
    authDomain: "purrefect-odds.firebaseapp.com",
    databaseURL: "https://purrefect-odds-default-rtdb.firebaseio.com",
    projectId: "purrefect-odds",
    storageBucket: "purrefect-odds.firebasestorage.app",
    messagingSenderId: "465003165335",
    appId: "1:465003165335:web:5a99e887063dbbffec9bd2",
    measurementId: "G-NWXLDWDCKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getDatabase();

const players_ref = ref(db, 'players/');

export {db, players_ref}