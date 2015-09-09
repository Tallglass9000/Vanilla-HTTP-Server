var chai = require('chai');
var chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

chai.request('http://localhost:3000')
  .get('/')