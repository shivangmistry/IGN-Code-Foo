const express = require('express');
const request = require('request');
const path = require('path');
const url = "https://ign-apis.herokuapp.com";

const app = express();

app.use(express.static(path.join( __dirname, '/public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.sendFile( 'index.html', {root: path.join(__dirname, "/public")});
})

app.get('/videos', (req, res) => {
    request(
        { url: url + "/videos" },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: "Error" });
            }
            res.json(JSON.parse(body));
        }
    )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));