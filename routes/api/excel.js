const express = require('express');
const router = express.Router();
const Room = require('../../models/Room');
const { check, validationResult } = require('express-validator');
const xl = require('excel4node');
const Student = require('../../models/Student');


router.get("/rooms", async (req, res) => {
    try {
        const rooms = await Room.getRooms()
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet('Rooms');
        const headingColumnNames = [
            "Номер комнаты",
            "Размер комнаты",
            "Склад"
        ]
        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++)
                .string(heading.toString())
        });

        let rowIndex = 2;
        rooms.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
                ws.cell(rowIndex, columnIndex++)
                    .string(record[columnName].toString())
            });
            rowIndex++;
        });
        wb.write('rooms.xlsx')
        res.sendFile('D:/myFolder/asp.net course/Hostel Manage/rooms.xlsx')
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }
});

router.get("/students", async (req, res) => {
    try {
        const students = await Student.getStudents()
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet('Students');
        const headingColumnNames = [
            "Номер",
            "Имя",
            "Фамилия",
            "Отчество",
            "Дата рождения",
            "Почта",
            "Телефон",
            "Пол",
            "Дата выселения",
            "Дата заселения"
        ]
        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++)
                .string(heading.toString())
        });

        let rowIndex = 2;
        students.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
                ws.cell(rowIndex, columnIndex++)
                    .string(record[columnName].toString())
            });
            rowIndex++;
        });
        wb.write('students.xlsx')
        res.sendFile('D:/myFolder/asp.net course/Hostel Manage/students.xlsx')
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }
});
module.exports = router;

