'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'yoba',
  cookie: {httpOnly: false},
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', 0);
  return next();
});

var storage = {};
app.route('/server-artifact-id/resource')
  .get(function (req, res) {
    res.send({resources: storage[req.sessionID] || []});
  })
  .post(function (req, res) {
    var data = storage[req.sessionID] || [];
    storage[req.sessionID] = data.concat([req.body]);
    res.send({});
  });

app.listen(process.argv[2] || 3000);
console.log('listening...');
