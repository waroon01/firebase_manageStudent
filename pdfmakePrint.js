import { showStudentList } from "./search_student.js";

// ตั้งค่า Font
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

export const generateStudentPDF = async () => {
    try {
        const studentsData = await showStudentList();

        if (!studentsData || studentsData.length === 0) {
            alert("ไม่พบข้อมูลนักเรียน");
            return;
        }

        configureFonts();

        const bodyData = [];
        // Header
        bodyData.push([
            { text: 'ลำดับ', bold: true, fillColor: '#eeeeee' },
            { text: 'รหัส', bold: true, fillColor: '#eeeeee' },
            { text: 'ชื่อ-สกุล', bold: true, fillColor: '#eeeeee' },
            { text: 'ชั้นเรียน', bold: true, fillColor: '#eeeeee' },
            { text: 'สถานะ', bold: true, fillColor: '#eeeeee' }
        ]);

        // Body
        studentsData.forEach((std, index) => {
            let statusText = std.status === 'active' ? 'กำลังเรียน' : 
                             std.status === 'suspended' ? 'พักการเรียน' : 
                             std.status === 'graduated' ? 'จบการศึกษา' : '-';

            bodyData.push([
                (index + 1).toString(),
                std.studentId || "-",
                std.fullName || "-",
                `${std.grade} ห้อง ${std.room}`,
                statusText
            ]);
        });

        const docDefinition = {
            pageSize: 'A4',
            defaultStyle: { font: 'THSarabunNew', fontSize: 16 },
            content: [
                { text: 'รายชื่อนักเรียนทั้งหมด', fontSize: 20, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', '*', 'auto', 'auto'],
                        body: bodyData
                    },
                    layout: 'lightHorizontalLines'
                }
            ]
        };

        pdfMake.createPdf(docDefinition).open();

    } catch (error) {
        alert("เกิดข้อผิดพลาดในการสร้าง PDF: " + error.message);
        console.error(error);
    }
};