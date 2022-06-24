const Schema = require('../connectDB');
const mongoose = require('mongoose');

const calendarSchema = new Schema({
    message: String,
    name: String,
    room: String,
    time: Object,
}, {
    collection: 'messager'
});

const MessagerModel = mongoose.model('calendar', calendarSchema);

module.exports = MessagerModel;