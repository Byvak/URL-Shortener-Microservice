const mongoose = require('mongoose');
const counter_entity = require('./entities/counter_entity').CounterEntity();
const Counter = mongoose.model("Counter", counter_entity);


module.exports.findByIdAndUpdate = function (id, callback) {
    Counter.findByIdAndUpdate(
        }
    );
}
