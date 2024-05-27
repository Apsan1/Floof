const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const videosRouter = require('./routes/videos.js');
const defaultRouter = require('./routes/index.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'videos' directory
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Use the routers
app.use('/users', usersRouter);
app.use('/videos', videosRouter);
app.use('/', defaultRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
