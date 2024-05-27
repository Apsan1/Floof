const express = require('express');
const ngrok = require('ngrok');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const videosRouter = require('./routes/videos.js');
const { router, getApiUrl } = require('./routes/index.js');

let apiUrl;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'videos' directory
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Use the routers
app.use('/users', usersRouter);
app.use('/videos', videosRouter);
app.use('/', router); // Use the router exported from index.js

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    try {
        const url = await ngrok.connect({
            addr: port,
            authtoken: '2h3UgdNwzIGQRH3LPuIssv0MP0v_4nhnzzuzi3FPeN7js8MrA',
        });
        console.log(`Server exposed to the internet at ${url}`);
        apiUrl = url;
        getApiUrl(url); // Call getApiUrl to set the apiUrl
    } catch (error) {
        console.error('Error connecting to Ngrok:', error);
        apiUrl = `http://localhost:${port}`;
        getApiUrl(apiUrl); // Call getApiUrl to set the apiUrl
    }
});

// Add a simple route to verify the server is working
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

module.exports = { apiUrl }; // Export apiUrl
