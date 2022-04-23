var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.CounterEntity = function CounterEntity() {
    return new Schema({
        _id: { type: String, required: true },
        seq: { type: Number, default: 0 },
    });
}