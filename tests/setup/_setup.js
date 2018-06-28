'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Módulo que crea una conexión con el servidor de express para poder importarlo en las pruebas que se hacen con supertest, así como también
 * realiza la conexión con la bd de pruebas.
 */

const bodyParser = require('body-parser')
const express = require('express')
const routes = require('../../api/routes/v1')
const database = require('../../db/connection')

const beforeAction = async () => {
  const testapp = express()

  testapp.use(bodyParser.urlencoded({ extended: false }))
  testapp.use(bodyParser.json())

  routes(testapp)

  await database.authenticate()
  await database.drop()
  await database.sync().then(() => console.log('Connection to the database has been established successfully'))

  return testapp
}

const afterAction = async () => {
  await database.close()
}

module.exports = { beforeAction, afterAction }
