'use strict'

const request = require('supertest')
const test = require('ava')

const {
  beforeAction,
  afterAction
} = require('../setup/_setup')

let api

test.before(async () => {
  api = await beforeAction()
})

test.after(() => {
  afterAction()
})

test.serial.cb('/v1/ping', t => {
  request(api)
    .get('/v1/ping')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      t.deepEqual(body, { message: 'pong' }, 'response bdy should be the expected')
      t.end()
    })
})
