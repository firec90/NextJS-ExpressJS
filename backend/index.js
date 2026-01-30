const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Backend jalan 🚀');
});

app.listen(3001, () => {
    console.log('Server running di http://localhost:3001');
});