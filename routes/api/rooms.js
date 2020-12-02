const express = require('express');
const router = express.Router();
const Room = require('../../models/Room');


router.get("/", async (req, res) => {
    try {
        Room.find({})
            .then(room => {
                res.send(room);
            });
    }
    catch {

    }

});

router.post("/", async (req, res) => {
    console.log(req.body);
    Room.create(req.body)
        .then(room => {
            res.send(room);
        });
});

router.put("/:id", async (req, res) => {
    try {
        Room.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(()=>{
            Room.findOne({_id: req.params.id})
            .then(room => {
                res.send(room);
            })
        });
    }
    catch {

    }
});

router.delete("/:id", async (req, res) => {
    try {
        Room.deleteOne({_id: req.params.id})
        .then(room => {
            res.send(room);
        });
    }
    catch {

    }
});


module.exports = router;