import { watchStudents } from "./search_student.js";
// import { generateStudentPDF } from "./pdf-service.js"; // ถ้ามีปุ่ม PDF

// 1. ฟังก์ชันสำหรับวาดตาราง HTML (UI)
const renderTable = (students) => {
    const tbody = document.getElementById('table-body');
    const countDisplay = document.getElementById('count-student'); // ถ้ามีตัวเลขบอกจำนวน
    
    // ล้างข้อมูลเก่าทิ้งก่อนวาดใหม่
    tbody.innerHTML = "";

    if (!students || students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center p-4 text-gray-500">ไม่พบข้อมูลนักเรียน</td></tr>`;
        if(countDisplay) countDisplay.innerText = "0";
        return;
    }

    // อัปเดตจำนวนนักเรียน
    if(countDisplay) countDisplay.innerText = students.length;

    // วนลูปสร้างแถวในตาราง
    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.className = "border-b hover:bg-gray-50 transition-colors";
        tr.innerHTML = `
            <td class="px-4 py-3 text-center text-gray-500">${index + 1}</td>
            <td class="px-4 py-3 font-medium text-indigo-700">${student.studentId || '-'}</td>
            <td class="px-4 py-3 font-semibold text-gray-700">${student.fullName || '-'}</td>
            <td class="px-4 py-3">
                <span class="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-bold border border-indigo-100">
                    ${student.grade} / ${student.room}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

// 2. เรียกใช้งาน Real-time Listener
// ส่งฟังก์ชัน renderTable เข้าไป -> เมื่อข้อมูลเปลี่ยน renderTable จะทำงานทันที
console.log("Start watching students...");
watchStudents(renderTable);

export {renderTable}