import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCoVVEFc1vTU5b5Fx2Jrd1DamYWIIyXPyA",
  authDomain: "studentmanage-c1bf4.firebaseapp.com",
  projectId: "studentmanage-c1bf4",
  storageBucket: "studentmanage-c1bf4.firebasestorage.app",
  messagingSenderId: "753672108518",
  appId: "1:753672108518:web:16560d5582227ba33cfe27",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
