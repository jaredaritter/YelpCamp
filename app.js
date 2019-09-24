const express = require('express');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Welcome Home');
});

app.get('*', (req, res) => {
    res.send("Are you lost?")
});

app.listen(3000, () => {
    console.log('Server started');
});