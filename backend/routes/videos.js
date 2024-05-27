const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'videos'); // Folder to save the uploaded videos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage: storage });

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
router.post('/add', upload.single('video'), async (req, res) => {
    const { title, viewCount, createdDate, description, userId } = req.body;
    console.log(req.file);
    const videoFilePath = req.file.path; // Path to the uploaded video file
    try {
        const [result] = await pool.query(
            'INSERT INTO videos (title, view_count, created_date, description, user_id, link) VALUES (?, ?, ?, ?, ?, ?)',
            [title, viewCount, createdDate, description, userId, videoFilePath]
        );
        res.status(201).json({ id: result.insertId, title, viewCount, createdDate, description, userId, videoFilePath });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Update a video by ID
router.put('/update/:id', upload.single('video'), async (req, res) => {
    const { id } = req.params;
    const { title, viewCount, createdDate, description, userId } = req.body;
    const videoFilePath = req.file ? req.file.path : null; // Path to the uploaded video file if a new one is provided

    try {
        const updateQuery = videoFilePath
            ? 'UPDATE videos SET title = ?, view_count = ?, created_date = ?, description = ?, user_id = ?, video_file_path = ? WHERE id = ?'
            : 'UPDATE videos SET title = ?, view_count = ?, created_date = ?, description = ?, user_id = ? WHERE id = ?';
        const updateValues = videoFilePath
            ? [title, viewCount, createdDate, description, userId, videoFilePath, id]
            : [title, viewCount, createdDate, description, userId, id];

        const [result] = await pool.query(updateQuery, updateValues);
        if (result.affectedRows > 0) {
            res.json({ id, title, viewCount, createdDate, description, userId, videoFilePath });
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

// Get all comments for a video by ID
router.get('/:id/comments', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM comments WHERE video_id = ?', [id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
