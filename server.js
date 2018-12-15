const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');

const port = process.env.PORT || 3000;

const config = require('./config/API-config');

const app = express();

// static folder
app.use(express.static(path.join(__dirname, 'eChart-for-Historian')));

// app.use(cors());   // enable all CORS requests

// enable pre-flight across-the-board
app.options('*', cors());    // include before other routes

app.get('/api', async (req, res, next) => {
    const options = {
        headers: { Authorization: config.API.access_token }
    };

    let response = await fetch(config.API.url, options);
    let historianData = await response.json();
    console.log(historianData);     // deactivate when client is ready
    res.send(historianData);        // activate when client is ready
    next();
});

// serves the client code
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'eChart-for-Historian/index.html')));

app.listen(port, () => console.log(`Server running on port ${port}`));
