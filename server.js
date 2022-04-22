require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const URL = require('url').URL;
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const dbUri = process.env.MONGO_URI;
//var Schema = mongoose.Schema;

mongoose.createConnection(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("Une erreur lors de la connection" + err);
    } else {
        console.log("Connexion etablie avec succes");
    }
});

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

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

//Function to convert a base58 string to base 10 integer
function decode(str) {
    var decoded = 0;
    while (str) {
        var index = alphabet.indexOf(str[0]);
        var power = str.length - 1;
        decoded += index * (Math.pow(base, power));
        str = str.substring(1);
    }
    return decoded;
}

//

//The route that handle the long url sended by the client
app.post('/api/shorturl', function (req, res) {
    var longUrl = req.body.url;
    var parsedUrl;

    //First we need to check that the url is valid
    const isValidUrl = (longUrl) => {
        try {
            parsedUrl = new URL(longUrl);
            return true;
        } catch (error) {
            return false;
        }
    }

    if (isValidUrl(longUrl)) {
        //We first need to retrieve only the hostname by removing the protocol
        const REPLACE_REGEX = /^https?:\/\/www./i;
        const hostName = longUrl.replace(REPLACE_REGEX, '');
        // We can now check if the submitted URL exists
        dns.lookup(hostName, (err) => {
            if (err) {
                res.json({
                    error: "Invalid Hostname"
                });
            } else {
                //Now we can shorten the url
                res.json({
                    Gooo: "Very Good 2"
                });
            }
        });
    } else {
        res.json({
            error: "Invalid Url"
        });
    }
});


//The route that handle the shorturl sended by client and redirect him to the original url
app.get('/api/shorturl/:short_url', function (req, res) {
    var shorturl = req.params.short_url;
    res.json({
        haahha: "knkbdsjkcs"
    })
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
