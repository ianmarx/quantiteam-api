const expect = require('expect.js');
const request = require('supertest');
const app = require('../app/server');

const port = process.env.PORT || 9090;


describe('API server', () => {
  let server;
  beforeEach(() => {
    server = app.listen(port);
  });
  it('/api returns 200 on GET', (done) => {
    request(server).get('/api', (done) => {
      expect(200);
      done();
    });
    done();
  });
  it('/api/users returns 200 on GET', (done) => {
    request(server).get('/api/users', (done) => {
      expect(200);
      done();
    });
    done();
  });
  afterEach((done) => {
    server.close(done);
  });
});
