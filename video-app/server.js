// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Video = require('./models/video');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create a new video
app.post('/videos', async (req, res) => {
  try {
    const { title, url, thumbnail } = req.body;
    const video = await Video.create({ title, url, thumbnail });
    res.status(201).json(video);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Failed to create video' });
  }
});

// Get all videos
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
