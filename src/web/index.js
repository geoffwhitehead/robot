var express = require('express');
var bodyParser = require('body-parser');

var run = function (port) {
    console.log('Running web server on port ' + port);
}

// API

module.exports = {
    run : run
}
