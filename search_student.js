import { collection, getDocs, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

const studentRef = collection(db, "students");

// 1. ดึงข้อมูลครั้งเดียว (สำหรับ PDF)
export const showStudentList = async () => {
    const q = query(studentRef, orderBy("studentId", "asc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// 2. เฝ้าดูข้อมูล Real-time (สำหรับตารางหน้าเว็บ)
// รับ callback function เข้ามาเพื่อส่งข้อมูลกลับไปหน้าจอ
export const watchStudents = (onUpdate) => {
    const q = query(studentRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        onUpdate(data);
    });

    return unsubscribe;
};