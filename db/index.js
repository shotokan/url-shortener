'use strict'

/**
 * authoe: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Módulo que se encarga de inicializar las conexiones, autenticar con la bd y realizar migraciones dependiendo de la variable de entorno NODE_ENV
 */

const database = require('./connection')

const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate()

  const dropDB = () => database.drop()

  const syncDB = () => database.sync()

  const successfulDBStart = () => (
    console.info('connection to the database has been established successfully')
  )

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  )

  const wrongEnvironment = () => {
    console.warn(`only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`)
    return process.exit(1)
  }

  const startMigrateTrue = async () => {
    try {
      await syncDB()
      successfulDBStart()
    } catch (err) {
      errorDBStart(err)
    }
  }

  const startMigrateFalse = async () => {
    try {
      await dropDB()
      await syncDB()
      successfulDBStart()
    } catch (err) {
      errorDBStart(err)
    }
  }

  const startDev = async () => {
    try {
      await authenticateDB()

      if (migrate) {
        return startMigrateTrue()
      }

      return startMigrateFalse()
    } catch (err) {
      return errorDBStart(err)
    }
  }

  const startStage = async () => {
    try {
      await authenticateDB()

      if (migrate) {
        return startMigrateTrue()
      }

      return startMigrateFalse()
    } catch (err) {
      return errorDBStart(err)
    }
  }

  const startTest = async () => {
    try {
      await authenticateDB()
      await startMigrateFalse()
    } catch (err) {
      errorDBStart(err)
    }
  }

  const startProd = async () => {
    try {
      await authenticateDB()
      await startMigrateFalse()
    } catch (err) {
      errorDBStart(err)
    }
  }

  const start = async () => {
    switch (environment) {
      case 'developing':
        await startDev()
        break
      case 'staging':
        await startStage()
        break
      case 'testing':
        await startTest()
        break
      case 'production':
        console.log('produccion')
        await startProd()
        break
      default:
        await wrongEnvironment()
    }
  }

  return {
    start
  }
}

module.exports = dbService
