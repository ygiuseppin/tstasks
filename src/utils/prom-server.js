const express = require('express');

const server = express();
const port = 5000;
const register = require('prom-client').register;

server.get('/metrics', async (req, res) => {
    try{
        console.log('getmetrics ', register);
        res.set('Content-Type', register.contentType);
        res.send(await register.metrics());
    } catch (err) {
        res.status(500).send(err);
    }
})

server.listen(port);