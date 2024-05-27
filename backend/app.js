const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const videosRouter = require('./routes/videos.js');
const defaultRouter = require('./routes/index.js');

app.use(bodyParser.json());

// Use the users router
app.use('/users', usersRouter);
app.use('/videos', videosRouter);
app.use('/', defaultRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
