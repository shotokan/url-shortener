'use strict'

/**
 * authoe: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Módulo que tiene las funciones y lógica para crear las url cortas e interactuar con la bd.
 */

const validUrl = require('valid-url')
const shortid = require('shortid')
const uuid4 = require('uuid/v4')
const debug = require('debug')('url-shortener:api:routes')
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

  /**
   * Creates and save a short url.
   * @param {string} url - A url.
   * @param {host} url - The service's host.
   *
   * @returns {Object} An Url register
   */
  async createUrl (url, host) {
    try {
      // se valida que la url sea correcta
      if (!validUrl.isUri(url)) return ''
      const urlCode = shortid.generate()
      const shortUrl = `http://${host}/${urlCode}`
      let newUrl = {
        uuid: uuid4(),
        original: url,
        short: shortUrl,
        code: urlCode,
        visits: 0
      }
      let created = await Url.create(newUrl)
      return {
        uuid: created.uuid,
        short: created.short,
        code: created.code,
        original: created.original,
        visits: created.visits,
        updatedA: created.updatedA
      }
    } catch (e) {
      console.log(e)
      return null
    }
  }

  async createUrlBulk (urls, host) {
  }
}

module.exports = new URLService()
