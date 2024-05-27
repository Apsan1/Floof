const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');

// Configure multer storage for image and banner
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'UserImages'); // Folder to save the uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const bannerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'UserBanners'); // Folder to save the uploaded banners
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const uploadImage = multer({ storage: imageStorage });
const uploadBanner = multer({ storage: bannerStorage });

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
    const { name, email, password, banner_url, image_url } = req.body;
    const created_at = new Date();
    const updated_at = new Date();
    try {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, created_at, updated_at, banner_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, password, created_at, updated_at, banner_url, image_url]
        );
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Update a user by ID
router.put('/update/:id', uploadImage.single('image'), uploadBanner.single('banner'), async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const image_url = req.file ? `UserImages/${req.file.filename}` : null;
    const banner_url = req.file ? `UserBanners/${req.file.filename}` : null;
    const updated_at = new Date();

    try {
        const updateQuery = `
            UPDATE users 
            SET name = ?, email = ?, updated_at = ?, image_url = COALESCE(?, image_url), banner_url = COALESCE(?, banner_url)
            WHERE id = ?
        `;
        const [result] = await pool.query(updateQuery, [name, email, updated_at, image_url, banner_url, id]);
        if (result.affectedRows > 0) {
            res.json({ id, name, email, image_url, banner_url });
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

// Get image of a user by ID
router.get('/:id/image', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT image_url FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.sendFile(path.join(__dirname, '..', rows[0].image_url));
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}); 

module.exports = router;
