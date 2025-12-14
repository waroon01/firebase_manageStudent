import { createStudent } from "./create_student.js";
import { watchStudents } from "./search_student.js";
import { renderTable } from "./renderTable.js";
import { generateStudentPDF } from "./pdfmakePrint.js";

// 1. เริ่มต้นเฝ้าดูข้อมูล (Real-time)
// เมื่อข้อมูลเปลี่ยน -> เรียก renderTable ให้วาดตารางใหม่
watchStudents(renderTable);

// 2. จัดการปุ่ม "Create Student" (บันทึกข้อมูล)
const btnCreate = document.getElementById('btn-show');
btnCreate.addEventListener('click', async (e) => {
    e.preventDefault(); // ป้องกันฟอร์มรีเฟรชหน้า

    // ดึงข้อมูลจาก Form
    const form = document.getElementById('add-student-form');
    const formData = new FormData(form);
    
    const studentData = {
        studentId: formData.get('studentId'),
        fullName: formData.get('fullName'),
        grade: formData.get('grade'),
        room: formData.get('room'),
        note: formData.get('note'),
        status: formData.get('status') // ดึงค่าจาก Radio Button
    };

    // เช็คข้อมูลเบื้องต้น
    if (!studentData.studentId || !studentData.fullName) {
        alert("กรุณากรอกรหัสและชื่อนักเรียน");
        return;
    }

    // เปลี่ยนปุ่มเป็นสถานะกำลังโหลด
    const originalText = btnCreate.innerHTML;
    btnCreate.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก...`;
    btnCreate.disabled = true;

    // ส่งไปบันทึก
    const result = await createStudent(studentData);

    if (result.success) {
        alert("บันทึกข้อมูลเรียบร้อย!");
        form.reset(); // ล้างฟอร์ม
    } else {
        alert("เกิดข้อผิดพลาด: " + result.error);
    }

    // คืนค่าปุ่ม
    btnCreate.innerHTML = originalText;
    btnCreate.disabled = false;
});

// 3. จัดการปุ่ม "PDF"
const btnPdf = document.getElementById('btn-pdf');
btnPdf.addEventListener('click', () => {
    generateStudentPDF();
});