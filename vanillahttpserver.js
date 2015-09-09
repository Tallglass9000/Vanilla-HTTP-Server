'use strict';

var http = require('http');
var server = http.createServer(function(req, res) {
  if (req.url === '/greet/name') {
    req.on('data', function (data) {
      console.log("Hello " + data);
    });
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write("Hi there from the server!");
    return res.end();
  }

  if (req.url === '/time') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    res.write(hour + ":" + minutes);
    return res.end();
  }
  
  if (req.method === 'POST') {
    req.on('data', function (data) {
      var parsed = JSON.parse(data.toString());
      console.log(parsed.name);
    });
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write('{"msg": "success!"}');
    return res.end();
  }

  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.write('page not found');
  return res.end();
});

server.listen(3000, function() {
  console.log('server up');
});