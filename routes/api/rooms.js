const express = require('express');
const router = express.Router();
const Room = require('../../models/Room');
const { check, validationResult } = require('express-validator');
const xl = require('excel4node');



// GET /api/rooms/
router.get("/", async (req, res) => {
    try {
        const rooms = await Room.getRooms()
        res.json(rooms)
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, пропробуйте снова' })
    }
});

// POST /api/rooms/search
router.post("/search", async (req, res) => {
    try {
        let searchParams = { ...req.body }
        delete searchParams.emptyroom
        delete searchParams.emptyplaces
        delete searchParams.floornumber
        let rooms = await Room.find(searchParams)
        searchParams = { ...req.body }
        if (searchParams.emptyroom) {
            rooms = rooms.filter(room => room.students.length === 0)
        }
        if (searchParams.emptyplaces) {
            rooms = rooms.filter(room => (room.roomsize - room.students.length) == searchParams.emptyplaces)
        }
        if (searchParams.floornumber) {
            rooms = rooms.filter(room => room.roomnumber[0] == searchParams.floornumber)
        }
        res.json(rooms)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
});

// GET /api/rooms/:id
router.get("/:id", async (req, res) => {
    try {
        const room = await Room.getRoom(req.params.id)
        res.json(room)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
});

// POST /api/rooms/
router.post("/",
    [
        check('roomNumber', 'Некорректный номер комнаты').isNumeric(),
        check('roomSize', 'Неправильный размер комнаты').isNumeric(),
        check('storeRoom', 'Неправильный тип команты').isBoolean()
    ], async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при создании комнаты"
                })
            }
            const { roomNumber } = req.body;
            const candidate = await Room.findRoom(roomNumber)

            if (candidate) {
                return res.status(400).json({ message: "Такая комната уже существует" })
            }
            const room = await Room.createRoom(req.body)

            return res.status(201).json({ message: "Комната создана" })
        }
        catch (e) {
            return res.status(500).json({ message: e.message })
        }
    });


// PUT /api/rooms/
router.put("/:id",
    [
        check('roomnumber', 'Некорректный номер комнаты').isLength({ min: 1 }),
        check('roomsize', 'Неправильный размер комнаты').isLength({ min: 1 }),
        check('storeroom', 'Неправильный тип команты').isBoolean()
    ], async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: errors.array()[0].msg
                })
            }
            const candidate = await Room.getRoom(req.params.id)

            if (!candidate) {
                return res.status(400).json({ message: 'Такой Комнаты не существует' })
            }
            const existsRoom = await Room.getRoom(req.params.id)
            if (existsRoom.students.length > req.body.roomsize) {
                return res.status(400).json({ message: `Размер комнаты не может быть меньше количества проживающих: ${existsRoom.students.length}` })
            }
            if (existsRoom.students.length > 0 && req.body.storeroom) {
                return res.status(400).json({ message: `Пока в комнате проживают студенты ее нельзя сделать складской` })
            }
            const room = await Room.update(req.body)

            return res.status(201).json({ message: 'Комната обновлена' })
        }
        catch (e) {
            return res.status(500).json({ message: e.message })
        }
    });


// DELETE /api/rooms/
router.delete("/:id", async (req, res) => {
    try {
        Room.deleteOne({ _id: req.params.id })
            .then(room => {
                res.send(room);
            });
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }
});


module.exports = router;

