const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'belajar_fullstack'
});

db.connect((err) => {
    if (err) {
        console.log('Gagal konek MySQL:', err);
    } else {
        console.log('MySQL terhubung ✅');
    }
});

module.exports = db;