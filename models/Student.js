var mongoose = require('mongoose');


//create Schema
const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    patronymic: {
        type: String,
        trim: true,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Женский', 'Мужской']
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    arrivalDate: {
        type: String,
        required: true
    },
    leaveDate: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Student", StudentSchema);