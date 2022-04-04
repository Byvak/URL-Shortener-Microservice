require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

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
});


//The route that handle the shorturl sended by client and redirect him to the original url
app.get('/api/shorturl/short_url', function (req, res) {
    var shorturl = req.params.short_url;

    res.json({
        haahha: "knkbdsjkcs"
    })
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
