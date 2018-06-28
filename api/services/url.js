'use strict'

/**
 * authoe: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Módulo que tiene las funciones y lógica para crear las url cortas e interactuar con la bd.
 */

const debug = require('debug')('url-shortener:api:services')
const chalk = require('chalk')

const Url = require('../models/url')

class URLService {
  async getUrlByCode (code) {
  }

  /**
   * Gets all url registers
   *
   * @returns {Array} An array with Url registers
   */
  async getAllUrls () {
    debug(`Service: ${chalk.green('geting registers in getAllUrls')}`)
    try {
      let allActiveUrls = []
      let urls = await Url.findAll({ where: { active: true }, order: [['visits', 'DESC']] })
      for (let url of urls) {
        allActiveUrls.push({
          uuid: url.uuid,
          original: url.original,
          short: url.short,
          code: url.code,
          visits: url.visits,
          updatedAt: url.updatedAt
        })
      }
      return allActiveUrls
    } catch (err) {
      debug(`Service: ${chalk.green(err.message)}`)
      return null
    }
  }

  async createUrl (url, host) {
  }

  async createUrlBulk (urls, host) {
  }
}

module.exports = new URLService()
