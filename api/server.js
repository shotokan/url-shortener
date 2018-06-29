'use strict'

/**
 * third party libraries
 */
const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const http = require('http')
const cors = require('cors')
const db = require('../db')
const chalk = require('chalk')
const routes = require('./routes/v1')
const debug = require('debug')('url-shortener:api:server')
/**
 * server configuration
 */
const config = require('../config/')

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV

/**
 * express application
 */
const app = express()
const server = http.Server(app)

const DB = db(environment, config.migrate).start()

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors())

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false
}))

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
routes(app)

// handling errors
app.use((err, req, res, next) => {
  debug(`Error: ${chalk.red(err.message)}`)
  if (err.message.match(/Cannot/)) {
    return res.status(404).send({ error: err.message })
  }
  res.status(500).send({error: err.message})
})

// server listening
server.listen(config.server.port, () => {
  if (environment !== 'production' &&
    environment !== 'developing' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`)
    process.exit(1)
  }
  // se espera a la conexión de la bd, si no puede conectar se termina el proceso
  DB.then((a) => {
    debug(`Database: ${chalk.green('db is connected')}`)
  }).catch(handleFatalError)
  return DB
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}
