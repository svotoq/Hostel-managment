const express = require('express');
const router = express.Router();
const Student = require('../../models/Student');
const { check, validationResult } = require('express-validator');
const Room = require('../../models/Room');

// GET /api/students/
router.get("/", async (req, res) => {
    try {
        const students = await Student.getStudents()
        res.json(students)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
});

// GET /api/students/:id
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.getStudent(req.params.id)
        res.json(student)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
});

// POST /api/students/
router.post("/",
    [
        check('firstname', 'Некорректное имя').isString().isLength({ min: 1 }),
        check('lastname', 'Некорректная фамилия').isString().notEmpty(),
        check('patronymic', 'Некорректное отчество').isString().notEmpty(),
        check('birthdate', 'Некорректная дата рождения').notEmpty(),
        check('gender', 'Некорректный пол').isString().notEmpty(),
        check('arrivaldate', 'Некорректная дата заселения').notEmpty(),
        check('leavedate', 'Некорректная дата выселения').notEmpty(),
        check('room_id', 'Укажите комнату').notEmpty()
    ], async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при добавлении студента"
                })
            }
            const room = await Room.getRoom(req.body.room_id)
            if (room.roomsize - room.students.length === 0) {
                return res.status(400).json({ message: `Комната ${room.roomnumber} заполнена` })
            }
            if (room.storeroom) {
                return res.status(400).json({ message: `Комната ${room.roomnumber} является складским помещением` })
            }
            const student = await Student.create(req.body)


            return res.status(201).json({ message: 'Студент успешно создан' })
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }
    });

// POST /api/students/search
router.post("/search", async (req, res) => {
    try {
        let searchParams = { ...req.body }
        delete searchParams.roomnumber
        let students = await Student.find(searchParams)
        searchParams = { ...req.body }
        if (searchParams.roomnumber) {
            students = students.filter(student => student.room.roomnumber === searchParams.roomnumber)
        }
        res.json(students)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
});

// PUT /api/students/
router.put("/:id",
    [
        check('firstname', 'Некорректное имя').isString().isLength({ min: 1 }),
        check('lastname', 'Некорректная фамилия').isString().notEmpty(),
        check('patronymic', 'Некорректное отчество').isString().notEmpty(),
        check('birthdate', 'Некорректная дата рождения').notEmpty(),
        check('gender', 'Некорректный пол').isString().notEmpty(),
        check('arrivaldate', 'Некорректная дата заселения').notEmpty(),
        check('leavedate', 'Некорректная дата выселения').notEmpty(),
        check('room_id', 'Укажите комнату').notEmpty()
    ], async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при добавлении студента"
                })
            }
            if(new Date(req.body.arrivaldate) > new Date(req.body.leavedate)) {
                return res.status(500).json({message: 'Дата отъезда больше даты заселения'})
            }
            const existsStudent = await Student.getStudent(req.params.id)
            if(!existsStudent) {
                return res.status(500).json({message: 'Студент не существует'})
            }
            if (existsStudent.room_id != req.body.room_id) {
                const room = await Room.getRoom(req.body.room_id)
                if (room.roomsize - room.students.length === 0) {
                    return res.status(400).json({ message: `Комната ${room.roomnumber} заполнена` })
                }
                if (room.storeroom) {
                    return res.status(400).json({ message: `Комната ${room.roomnumber} является складским помещением` })
                }
            }
            const student = await Student.update(req.body, req.params.id)

            res.json(student)
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }
    });


// DELETE /api/students/
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.delete(req.params.id)
        return res.status(200).json({message: "Студент успешно удален"})
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, пропробуйте снова' })
    }
});


module.exports = router;