const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all users
router.get('/all', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Create a new user
router.post('/add', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Update a user by ID
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const [result] = await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        if (result.affectedRows > 0) {
            res.json({ id, name, email });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Delete a user by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.send('User deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Get all videos for a user by ID
router.get('/:id/videos', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM videos WHERE user_id = ?', [id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
