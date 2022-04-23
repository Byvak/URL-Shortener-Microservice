var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.UrlEntity = function UrlEntity() {
    return new Schema({
        _id: { type: String, index: true },
