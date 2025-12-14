import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

export const createStudent = async (data) => {
    try {
        const studentRef = collection(db, "students");
        const docRef = await addDoc(studentRef, {
            ...data,
            createdAt: Timestamp.now(),
            createdBy: "admin_user"
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating student:", error);
        return { success: false, error: error.message };
    }
};