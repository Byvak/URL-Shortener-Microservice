
const mongoose = require('mongoose');
const url_entity = require('./entities/url_entity').UrlEntity();
const counter_dao = require('./counter_dao');

//The function that should be executed before saving Urls
url_entity.pre("save", function (next) {
    var doc = this;
    counter_dao.findByIdAndUpdate("url_count", function (response) {
        if (response) {
            doc._id = response.seq;
            doc.created_at = new Date();
            next();
        } else {
            console.log("Oups une erreur " + response);
            next();
        }
    });
});
//
const Url = mongoose.model("Url", url_entity);

var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
var base = alphabet.length;

//Function to convert base 10 integer to base58 string
function encode(num) {
    var encoded = '';
    while (num) {
        var remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder].toString() + encoded;
    }
    return encoded;
}

module.exports.searchShortUrl = function (short_url, callback) {
    Url.findOne({ _id: short_url }, function (err, doc) {
        if (err) {
            callback(false, "Une erreur //// " + err)
        } else {
            callback(true, doc);
        }
    });
}

module.exports.saveUrl = function (longUrl, callback) {
    var short_url = '';
    Url.findOne({ long_url: longUrl }, function (err, doc) {
        if (err) {
            callback("Une erreur lors de la recherche de l'URL " + err);
        } else {
            if (doc) {
                short_url = encode(doc._id);
                callback(short_url);
            } else {
                var newUrl = Url({
                    long_url: longUrl
                });
                newUrl.save(function (err) {
                    if (err) {
                        callback("Une erreur lors du raccourcicement de l'URL " + err);
                    } else {
                        short_url = encode(newUrl._id);
                        callback(short_url);
                    }
                });
            }
        }
    });
}