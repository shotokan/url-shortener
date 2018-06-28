'use strict'

/**
 * authoe: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Modelo de Sequelize para la entidad URL.
 */

const Sequelize = require('sequelize')
const sequelize = require('../../db/connection')

module.exports = sequelize.define('Url', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4
  },
  original: {
    type: Sequelize.STRING,
    allowNull: false
  },
  short: {
    type: Sequelize.STRING,
    allowNull: false
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  visits: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
})
