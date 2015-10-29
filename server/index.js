// index.js
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');

var express = require('express');
var app = express();

var logBind = console.log.bind(console);

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  return new Router([
    {
      // match a request for the key "greeting"
      route: 'wixFood',
      // respond with a PathValue with the value of "Hello World."
      get: function() {
        return [
          {
            path: ['wixFood'],
            value: 'Banana'
          }
        ];
      }
    },
    {
      // match a request for the key "greeting"
      route: 'wixFood[{integers:foodIds}]',
      // respond with a PathValue with the value of "Hello World."
      get: function() {
        return [
          {
            path: ['wixFood', 0],
            value: 'Orange'
          }
        ];
      }
    }
  ]);
}));

// serve static files from current directory
app.use(express.static(__dirname + '/'));

var server = app.listen(3000);
