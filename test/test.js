import test from 'tape';

const before = test;
const after = test;

const setup = () => {
  const fixtures = {};

  // insert fixture code

  return fixtures;
};

const teardown = (fixtures) => {

  // dispose of fixtures
};

before('before', (assert) => {
  assert.pass('Do something before tests here');

  assert.end();
});

test('A test with fixtures', (assert) => {
  const fixture = setup();

  assert.equal(typeof fixture, 'object',
    'fixture should return an object');

  teardown(fixture);
  assert.end();
});

test('A passing test', (assert) => {
  assert.pass('This test will pass.');

  assert.end();
});

test('Assertions with tape.', (assert) => {
  const expected = 'something to test';
  const actual = 'something to test';

  assert.equal(actual, expected,
    'Given two mismatched values, .equal() should produce a nice bug report');

  assert.end();
});

after('after', (assert) => {
  assert.pass('Do something after tests here.');

  assert.end();
});
