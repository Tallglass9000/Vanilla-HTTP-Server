'use strict';

var http = require('http');

var server = http.createServer(function(req, res) {
  if (req.url.slice(0, 7) === "/greet/") {
    var url = req.url;
    var name = url.slice(7, url.length);
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write("Hello " + name);
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
    //Some of this code comes from mscdex at stackoverflow.com/questions/24356481/is-there-a-way-to-synchronously-read-the-contents-of-http-request-body-in-node-j
    var buffer = "";
    req.on('data', function (data) {
      buffer += data;
    }).on('end', function() {
      var result;
      result = JSON.parse(buffer.toString());
      console.log(result.name);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write("Hello " + result.name);
      return res.end();
    });
    return;
  }

  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.write('page not found');
  console.log('page not found');
  return res.end();
});

server.listen(3000, function() {
  console.log('server up');
});