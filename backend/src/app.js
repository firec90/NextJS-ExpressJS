const express = require('express');
const app = express();

// middleware agar bisa baca JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend jalan 🚀');
});

module.exports = app;