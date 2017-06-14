const expect = require('expect.js');
const http = require('http');


describe('/api', () => {
  it('should respond to GET with 200', (done) => {
    http.get('http://localhost:9090/api', (res) => {
      expect(res).to.exist;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
