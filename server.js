require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const URL = require('url').URL;
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const dbUri = process.env.MONGO_URI;

mongoose.createConnection(dbUri, { useNewUrlParser: true, useUnifiedTechnology: true });

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
        // We can now check if the submitted URL exists
        dns.lookup(parsedUrl.host, (err) => {
            if (err) {
                res.json({
                    error: "Invalid Url"
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
