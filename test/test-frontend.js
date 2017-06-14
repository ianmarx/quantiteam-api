const http = require('http');
const expect = require('expect.js');

describe('homepage', () => {
  it('should respond to GET with 200', (done) => {
    http.get('http://localhost:8080', (res) => {
      expect(res).to.exist;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
