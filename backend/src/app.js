const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const bcrypt = require('bcrypt');

// middleware agar bisa baca JSON
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend jalan 🚀');
});

// Buat middleware proteksi rute
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token dibutuhkan' }); // jika tidak ada token

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid' }); // jika token tidak valid
        req.user = user;
        next();
    });
}
// Buat middleware proteksi rute

// Login
app.post('/login', (request, respon) => {
    const { id_user, password } = request.body;
    const sql = 'SELECT * FROM users WHERE id_user = ?';
    db.query(sql, [id_user], async (err, results) => {
        if (err) return respon.status(500).json({ error: err.message });
        
        if (results.length === 0) {
            return respon.status(401).json({ message: 'ID User tidak ditemukan!' });
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return respon.status(401).json({ message: 'Password salah!' });
        }
        
        // buat token JWT
        const token = jwt.sign({ id_user: user.id_user, nama_user: user.nama_user }, SECRET_KEY, { expiresIn: '1h' });

        // Login sukses
        respon.status(200).json({ message: 'Login successful', token });
    });
});
// Login

// Route untuk mendapatkan semua barang
app.get('/barang', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM barang';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});
// Route untuk mendapatkan semua barang

// Route untuk menambahkan barang baru
app.post('/barang', authenticateToken, (req, res) => {
    const { kode_barang, nama_barang, harga } = req.body;
    const sql = 'INSERT INTO barang (kode_barang, nama_barang, harga) VALUES (?, ?, ?)';
    db.query(sql, [kode_barang, nama_barang, harga], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Barang berhasil ditambahkan' });
    });
});
// Route untuk menambahkan barang baru

// Route untuk menghapus barang
app.delete('/barang/:kode_barang', authenticateToken, (req, res) => {
    const kode_barang = req.params.kode_barang;
    const sql = 'DELETE FROM barang WHERE kode_barang = ?';
    db.query(sql, [kode_barang], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Barang tidak ditemukan' });
        }
        
        res.json({ message: 'Barang berhasil dihapus' });
    });
});
// Route untuk menghapus barang

// Route untuk memperbarui barang
app.put('/barang/:kode_barang', authenticateToken, (req, res) => {
    const kode_barang = req.params.kode_barang;
    const { nama_barang, harga } = req.body;
    const sql = 'UPDATE barang SET nama_barang = ?, harga = ? WHERE kode_barang = ?';
    db.query(sql, [nama_barang, harga, kode_barang], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Barang tidak ditemukan' });
        }
        
        res.json({ message: 'Barang berhasil diperbarui' });
    });
});
// Route untuk memperbarui barang

// Route untuk input user
app.post('/users', async (request, response) => {
    const { id_user, nama_user, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (id_user, nama_user, password) VALUES (?, ?, ?)';
    db.query(sql, [id_user, nama_user, hashedPassword], (err, result) => {
        if (err) {
            return response.status(500).json({ error: err.message });
        }
        response.status(201).json({ message: 'User berhasil ditambahkan' });
    });
})
// Route untuk input user

module.exports = app;