import {
  collection,
  getDocs,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import { db } from "./firebaseConfig.js";



const studentRef = collection(db, "students")

const showStudentList = async()=>{
    const snapshot = await getDocs(studentRef)

   const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
    return data
}


const watchStudents = () => {
  const unsubscribe = onSnapshot(studentRef, (snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  });

  console.log(unsubscribe)
  return unsubscribe; // ไว้หยุดฟัง
};


watchStudents()



export {showStudentList}
