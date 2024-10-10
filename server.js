// Basil Moyikkal
// c0908488

//  initialize the server
const express = require('express');
//  initialize the path
const path = require('path');
//  initialize the fs
const fs = require('fs');

// create an express app
const app = express();
// set the port
const port = 8080;

// serve static files from the 'public' directory
app.use(express.static('public'));

// custom middleware to handle file requests
app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'public', req.url);
    
    // check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // file exists, let express handle it
            next();
        } else {
            // file doesn't exist, log the attempt and send 404 error page
            console.log(`attempted to access non-existent page:🥲🥲 ${req.url}`);
            res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
        }
    });
});

// catch-all route for any undefined routes
app.get('*', (req, res) => {
    // log the attempt to access undefined route
    console.log(`attempted to access undefined route: ${req.url}`);
    // send 404 error page for any unmatched routes
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// start the server
app.listen(port, () => {
    console.log(`server running at 🚀🚀🚀 http://localhost:${port}/`);
});