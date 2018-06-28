'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Crea una conexión mediante sequlize, la configuración depende de la variable de entorno NODE_ENV
 */

const Sequelize = require('sequelize')

const config = require('../config')

let database

switch (process.env.NODE_ENV) {
  case 'production':
    database = new Sequelize(config.db.production)
    break
  case 'developing':
    database = new Sequelize(config.db.developing)
    break
  default:
    database = new Sequelize(config.db.testing)
}

module.exports = database
