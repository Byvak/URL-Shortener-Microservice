var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const counterEntity = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
}, { bufferCommands: false });
