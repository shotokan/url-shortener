'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Pruebas para las funciones que proporciona el servicio url.
 */

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const urlFixtures = require('../fixtures/url')

let sandbox = null
let UrlStub = {}
let service = null
let single = urlFixtures.single

let where = { where: { active: true }, order: [ ['visits', 'DESC'] ] }

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  UrlStub.findAll = sandbox.stub()
  UrlStub.findAll.withArgs(where).returns(Promise.resolve(urlFixtures.all))
  UrlStub.create = sandbox.stub()
  UrlStub.create.withArgs(single).returns(Promise.resolve(urlFixtures.byShortUrl(single.short)))
  service = proxyquire('../../api/services/url', {
    '../models/url': UrlStub
  })
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('service', t => {
  t.truthy(service, 'service service should exist')
})

test.serial('getAllUrls', async t => {
  let urls = await service.getAllUrls()
  t.true(UrlStub.findAll.called, 'findAll should be called on model')
  t.true(UrlStub.findAll.calledOnce, 'findAll should be called once')
  t.true(UrlStub.findAll.calledWith(where), 'findAll should be called with specified id')
  t.deepEqual(urls, urlFixtures.all, 'should be the same')
})
