import {showStudentList} from "./search_student.js";

const configureFonts = () => {
    pdfMake.fonts = {
        THSarabunNew: {
            normal: 'https://guykorat.github.io/font/THSarabunNew.ttf',
            bold: 'https://guykorat.github.io/font/Sarabun-ExtraBold.ttf',
            italics: 'https://guykorat.github.io/font/THSarabunNew.ttf',
            bolditalics: 'https://guykorat.github.io/font/THSarabunNew.ttf'
        },
        Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
    };
};

export const generateStudentPDF = async() => {
    const studentsData = await showStudentList()
    console.log(studentsData)

    if (!studentsData || studentsData.length === 0) {
        alert("ยังไม่มีข้อมูลนักเรียน");
        return;
    }

    // เรียกตั้งค่าฟอนต์ก่อนสร้าง
    configureFonts();

    const bodyData = [];
    
    // Header
    bodyData.push([
        { text: 'ลำดับ', bold: true, fillColor: '#eeeeee' },
        { text: 'รหัสนักเรียน', bold: true, fillColor: '#eeeeee' },
        { text: 'ชื่อ - นามสกุล', bold: true, fillColor: '#eeeeee' },
        { text: 'ชั้นเรียน', bold: true, fillColor: '#eeeeee' }
    ]);

    // Rows
    studentsData.forEach((std, index) => {
        bodyData.push([
            (index + 1).toString(),
            std.studentId || "-",
            std.fullName || "-",
            `${std.grade} ห้อง ${std.room}`
        ]);
    });

    const docDefinition = {
        pageSize: 'A4',
        defaultStyle: {
            font: 'THSarabunNew',
            fontSize: 16
        },
        content: [
            { text: 'รายชื่อนักเรียนทั้งหมด', fontSize: 20, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', '*', 'auto'],
                    body: bodyData
                },
                layout: 'lightHorizontalLines'
            }
        ]
    };

    try {
        pdfMake.createPdf(docDefinition).open();
    } catch (e) {
        alert("ไม่สามารถสร้าง PDF ได้: " + e.message);
    }
};