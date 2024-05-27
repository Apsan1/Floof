const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');

// Configure multer storage for videos
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'videos'); // Folder to save the uploaded videos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

// Configure multer storage for thumbnails
const thumbnailStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'thumbnails'); // Folder to save the uploaded thumbnails
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const uploadVideo = multer({ storage: videoStorage });
const uploadThumbnail = multer({ storage: thumbnailStorage });

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

// Create a new video with a thumbnail
router.post('/add', uploadVideo.single('video'), async (req, res) => {
    const upload = uploadThumbnail.single('thumbnail');
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        const { title, viewCount, createdDate, description, userId } = req.body;
        const videoFilePath = req.file ? req.file.path : null; // Path to the uploaded video file
        const thumbnailFilePath = req.file ? req.file.path : null; // Path to the uploaded thumbnail file

        try {
            const [result] = await pool.query(
                'INSERT INTO videos (title, view_count, created_date, description, user_id, link, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [title, viewCount, createdDate, description, userId, videoFilePath, thumbnailFilePath]
            );
            res.status(201).json({ id: result.insertId, title, viewCount, createdDate, description, userId, videoFilePath, thumbnailFilePath });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });
});

// Update a video by ID
router.put('/update/:id', uploadVideo.single('video'), async (req, res) => {
    const upload = uploadThumbnail.single('thumbnail');
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        const { id } = req.params;
        const { title, viewCount, createdDate, description, userId } = req.body;
        const videoFilePath = req.file ? req.file.path : null; // Path to the uploaded video file if a new one is provided
        const thumbnailFilePath = req.file ? req.file.path : null; // Path to the uploaded thumbnail file if a new one is provided

        try {
            const updateQuery = videoFilePath && thumbnailFilePath
                ? 'UPDATE videos SET title = ?, view_count = ?, created_date = ?, description = ?, user_id = ?, link = ?, thumbnail = ? WHERE id = ?'
                : videoFilePath
                    ? 'UPDATE videos SET title = ?, view_count = ?, created_date = ?, description = ?, user_id = ?, link = ? WHERE id = ?'
                    : thumbnailFilePath
                        ? 'UPDATE videos SET title = ?, view_count = ?, created_date = ?, description = ?, user_id = ?, thumbnail = ? WHERE id = ?'
                        : 'UPDATE videos SET title = ?, view_count = ?, created_date = ?, description = ?, user_id = ? WHERE id = ?';

            const updateValues = videoFilePath && thumbnailFilePath
                ? [title, viewCount, createdDate, description, userId, videoFilePath, thumbnailFilePath, id]
                : videoFilePath
                    ? [title, viewCount, createdDate, description, userId, videoFilePath, id]
                    : thumbnailFilePath
                        ? [title, viewCount, createdDate, description, userId, thumbnailFilePath, id]
                        : [title, viewCount, createdDate, description, userId, id];

            const [result] = await pool.query(updateQuery, updateValues);
            if (result.affectedRows > 0) {
                res.json({ id, title, viewCount, createdDate, description, userId, videoFilePath, thumbnailFilePath });
            } else {
                res.status(404).send('Video not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });
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

// Get thumbnail of a video by ID
router.get('/thumbnail/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT thumbnail FROM videos WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.sendFile(path.join(__dirname, `../${rows[0].thumbnail}`));
        } else {
            res.status(404).send('Thumbnail not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
