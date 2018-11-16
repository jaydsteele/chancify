const request = require('supertest')
const { assert } = require('chai')
const app = require('./server')

describe('GET /item/sample_user', () => {
  it('respond with JSON', (done) => {
    request(app)
      .get('/item/sample_user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isObject(res.body)
        assert.containsAllKeys(res.body, [
          'id', 'firstName', 'lastName', 'birthday', 'ssn', 'email', 'address',
        ])
      })
      .expect(200, done)
  })
})

describe('GET /item/sample_user?seed=abc', () => {
  it('respond with JSON', (done) => {
    request(app)
      .get('/item/sample_user?seed=1bc')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isObject(res.body)
      })
      .expect(200, done)
  })
})

describe('GET /list/sample_user', () => {
  it('respond with JSON', (done) => {
    request(app)
      .get('/list/sample_user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body)
      })
      .expect(200, done)
  })
})

describe('GET /list/sample_user?max=1', () => {
  it('respond with JSON', (done) => {
    request(app)
      .get('/list/sample_user?max=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body)
        assert.equal(res.body.length, 1)
      })
      .expect(200, done)
  })
})

describe('GET /list/sample_user?max=10&limit=5', () => {
  it('respond with JSON', (done) => {
    request(app)
      .get('/list/sample_user?max=10&limit=5')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body)
        assert.equal(res.body.length, 5)
      })
      .expect(200, done)
  })
})

describe('GET /list/sample_user?max=10&limit=5&skip=8', () => {
  it('respond with JSON', (done) => {
    request(app)
      .get('/list/sample_user?max=10&limit=5&skip=8')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body)
        assert.equal(res.body.length, 2)
      })
      .expect(200, done)
  })
})

describe('GET /item/some_random_resource', () => {
  it('not found', (done) => {
    request(app)
      .get('/item/some_random_resource')
      .expect(404, done)
  })
})

describe('GET /list/some_random_resource', () => {
  it('not found', (done) => {
    request(app)
      .get('/list/some_random_resource')
      .expect(404, done)
  })
})
