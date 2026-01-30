const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pos_db'
});

db.connect((err) => {
    if (err) {
        console.log('Gagal konek MySQL:', err);
    } else {
        console.log('MySQL terhubung ✅');
    }
});

module.exports = db;