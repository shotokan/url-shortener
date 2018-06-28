'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Módulo que tiene las funciones y lógica para crear las url cortas e interactuar con la bd.
 */

const Sequelize = require('sequelize')
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
  /**
   * Saves a bulk of short urls from an array.
   * @param {Array} urls - urls.
   * @param {host} url - The service's host.
   *
   * @returns {Array} An array with all Urls registered
   */
  async createUrlBulk (urls, host) {
    try {
      if (!Array.isArray(urls)) return ''
      let uids = []
      let newShortUrls = []
      // crea un arreglo con los datos necesarios para el objeto Url
      for (let url of urls) {
        if (!validUrl.isUri(url)) continue
        const urlCode = shortid.generate()
        const shortUrl = `http://${host}/${urlCode}`
        let newUrl = {
          uuid: uuid4(),
          original: url,
          short: shortUrl,
          code: urlCode,
          visits: 0
        }
        newShortUrls.push(newUrl)
        uids.push(newUrl.uuid)
      }
      const Op = Sequelize.Op
      // se realiza la insercion de los datos como arreglo, esto para que haga un insert de varios valores
      await Url.bulkCreate(newShortUrls)
      // debid a que bulkCrate no devuelve un arreglo con los datos creados se realiza una petición a la bd para traer los datos y verificar que se hayan guardado
      let urlsCreated = await Url.findAll({ where: { uuid: { [Op.in]: uids } } })
      let news = []
      // se crean objetos para ligar la url original con su versión corta, esto para devolver como respuesta al controlador
      for (let url of urlsCreated) {
        news.push({
          short_url: url.short,
          original_url: url.original
        })
      }

      return news
    } catch (e) {
      console.log(e)
      return null
    }
  }
}

module.exports = new URLService()
