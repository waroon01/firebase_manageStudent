import {
  collection,
  addDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import { db } from "./firebaseConfig.js";
import showStudentList from "./search_student.js";

const formStudent = document.getElementById("add-student-form");

const createStudent = async (e) => {
  e.preventDefault();

  const formData = new FormData(formStudent);

  const studentData = {
    ...Object.fromEntries(formData),
    createdAt: Timestamp.now(),
  };

  //   const studentData = {
  //     studentId: formData.get("studentId"),
  //     fullName: formData.get("fullName"),
  //     grade: formData.get("grade"),
  //     room: formData.get("room"),
  //     note: formData.get("note"),
  //     status: formData.get("status"),
  //     createdAt: Timestamp.now(),
  //   };

  console.log(studentData);
  try {
    const docRef = await addDoc(
      collection(db, "students"),
      studentData,      
    );
    alert(`บันทึกสำเร็จ!\nID: ${docRef.id}`);
    const studentList = await showStudentList()
    console.log(studentList)

  } catch (error) {
    logBox.innerHTML += `<br>> ผิดพลาด: ${error.message}`;
    alert("เกิดข้อผิดพลาด: " + error.message);
  }
};

formStudent.addEventListener("submit", createStudent);
