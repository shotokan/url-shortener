'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Pruebas para el controlador url.
 */

const request = require('supertest')
const test = require('ava')
const sinon = require('sinon')
const Url = require('../../api/models/url')
const {
  beforeAction,
  afterAction
} = require('../setup/_setup')

let api
let sandbox = null
let dbStub = null
let UrlStub = {}

test.before(async () => {
  api = await beforeAction()
})

test.after(() => {
  afterAction()
})

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Url: UrlStub
  }))
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test.serial.cb('/v1/urls', t => {
  request(api)
    .post('/v1/urls')
    .send({
      'url': 'http://www.facebook.com.mx'
    })
    .set('Content-Type', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(async (err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      t.deepEqual(body.data.original, 'http://www.facebook.com.mx', 'response body should be the expected')
      const url = await Url.findById(res.body.data.uuid)
      t.deepEqual(body.data.short, url.short, 'short should be the same')
      t.end()
    })
})

test.serial.cb('/v1/urls/bulk', t => {
  request(api)
    .post('/v1/urls/bulk')
    .send({
      urls: [
        'http://docs.sequelizejs.com/manual/tutorial/instances.html#creating-persistent-instances',
        'https://stackoverflow.com/questions/767486/how-do-you-check-if-a-variable-is-an-array-in-javascript'
      ]
    })
    .set('Content-Type', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(async (err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      let _urls = []
      for (let url of body.data) {
        _urls.push(url.original_url)
      }
      t.deepEqual(_urls.length, [
        'http://docs.sequelizejs.com/manual/tutorial/instances.html#creating-persistent-instances',
        'https://stackoverflow.com/questions/767486/how-do-you-check-if-a-variable-is-an-array-in-javascript'
      ].length, 'arrays should be the same')
      t.end()
    })
})

test.serial.cb('/v1/urls/', t => {
  request(api)
    .get('/v1/urls')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(async (err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      t.true(Array.isArray(body.data), 'arrays should be true')
      t.end()
    })
})
