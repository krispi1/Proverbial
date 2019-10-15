"use strict"; // enforce strict mode for error checking

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const PORT = parseInt(process.env.PORT || 3000) ;

app.use(require('./routes'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// render root
app.get(['', '/'], (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// handle missing/incorrect route
app.use((req, res) => {
    res.status(404)
        .send('Sorry... we couldn\'t find that resource!!');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


