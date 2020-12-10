const express = require('express');
const router = express.Router();
const Room = require('../../models/Room');

// GET /api/rooms/
router.get("/", async (req, res) => {
    try {
        Room.find({})
            .then(room => {
                res.send(room);
            });
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, пропробуйте снова' })
    }
});

// POST /api/rooms/
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        Room.create(req.body)
            .then(room => {
                res.send(room);
            });
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, пропробуйте снова' })
    }
});


// PUT /api/rooms/
router.put("/:id", async (req, res) => {
    try {
        Room.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                Room.findOne({ _id: req.params.id })
                    .then(room => {
                        res.send(room);
                    })
            });
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, пропробуйте снова' })
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
        res.status(500).json({ message: 'Что-то пошло не так, пропробуйте снова' })
    }
});


module.exports = router;