var chai = require('chai');
var chaiHTTP = require('chai-http');
var expect = chai.expect;

chai.use(chaiHTTP);

//some of this code is from https://gist.github.com/DDunc/3a6eba28879050a7383f
describe('vanillahttpserver.js', function() {
  describe('GET /greet/VeryLargeNoticeableName', function() {
    var response;
    var error;
    before(function (done) {
      chai.request('http://localhost:3000')
        .get('/greet/VeryLargeNoticeableName')
        .end(function(err, res) {
          error = err;
          response = res;
          done();
        });
    });

    it('should log a name', function() {
      console.log(response.text);
      expect(response.text).to.eql("Hello VeryLargeNoticeableName");
    });
  });

  describe('GET /time', function() {
    var response;
    var error;
    before(function (done) {
      chai.request('http://localhost:3000')
        .get('/time')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          error = err;
          response = res;
          done();
        });
    });

    it('should log the time', function () {
      console.log(response.text);
      expect(response.text).to.match(/^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/);
    });
  });

  describe('POST /greet', function() {
    var response;
    var error;
    before(function (done) {
      chai.request('http://localhost:3000')
        .post('/greet')
        //.set('Content-Type', 'application/json')
        .send('{"name":"AnotherVeryLargeNoticeableName"}')
        .end(function(err, res) {
          error = err;
          response = res;
          done();
        });
    });


    it('should log another name', function () {
      expect(response.text).to.eql("Hello AnotherVeryLargeNoticeableName");
    });
  });
});
