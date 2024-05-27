const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all videos
router.get('/all', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM videos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Get a single video by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM videos WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Video not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Create a new video
router.post('/add', async (req, res) => {
    const { title, viewCount, createdDate, description, userId } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO videos (title, view_count, created_date, description, user_id) VALUES (?, ?, ?, ?, ?)', [title, viewCount, createdDate, description, userId]);
        res.status(201).json({ id: result.insertId, title, viewCount, createdDate, description, userId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Update a video by ID
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, viewCount, createdDate, description, userId } = req.body;
    try {
        const [result] = await pool.query('UPDATE videos SET title = ?, view_count = ?, created_date = ?, description = ?, user_id = ? WHERE id = ?', [title, viewCount, createdDate, description, userId, id]);
        if (result.affectedRows > 0) {
            res.json({ id, title, viewCount, createdDate, description, userId });
        } else {
            res.status(404).send('Video not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Delete a video by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM videos WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.send('Video deleted');
        } else {
            res.status(404).send('Video not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
