const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/yarn', require('../lib/controllers/yarn'));
app.use('/needles', require('../lib/controllers/needles'));
app.use('/cookies', require('../lib/controllers/cookies'));
app.use('/sheep', require('../lib/controllers/sheep'));
app.use('/aromatics', require('../lib/controllers/aromatics'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
