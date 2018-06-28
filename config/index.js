'use strict'

const debug = require('debug')('url-shortener:api:db')

module.exports = {
  db: {
    production: {
      database: process.env.DB_NAME || 'url-shortener',
      username: process.env.DB_USER || 'ivan',
      password: process.env.DB_PASS || '12345678',
      host: process.env.DATABASE_URL || 'localhost',
      dialect: 'postgres',
      logging: s => debug(s)
    },
    testing: {
      database: process.env.DB_NAME || 'url-shortener',
      username: process.env.DB_USER || 'ivan',
      password: process.env.DB_PASS || '12345678',
      host: process.env.DATABASE_URL || 'localhost',
      dialect: 'sqlite',
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      },
      query: {
        raw: true
      },
      logging: s => debug(s)
    },
    developing: {
      database: process.env.DB_NAME || 'url-shortener',
      username: process.env.DB_USER || 'ivan',
      password: process.env.DB_PASS || '12345678',
      host: process.env.DATABASE_URL || 'localhost',
      dialect: 'postgres',
      logging: s => debug(s)
    } },
  server: {
    port: 3000
  },
  migrate: true
}
