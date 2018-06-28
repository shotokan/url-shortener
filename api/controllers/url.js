'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Controlador con los métodos para realizar la creación y obtención de las urls cortas.
 */

const debug = require('debug')('url-shortener:api:controller:url')
const chalk = require('chalk')

const URLService = require('../services/url')
const response = require('../utils/response')
const utils = require('../utils')
class URLController {
  async createUrl (req, res, next) {
    debug(`URL: ${chalk.green('creating register')}`)
    let body = req.body
    let uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'))
    let url = await URLService.createUrl(body.url, req.get('host'))
    if (url === '') {
      res.status(400).send(response.error('Empty data', 400, uri, 'No se pudo acortar la url. La url debe tener un formato correcto.'))
    } else if (url === null) {
      res.status(400).send(response.error('Empty data', 400, uri, 'Ha habido un problema y no se ha podido crear la url.'))
    } else {
      res.send(response.success(url, 200, uri))
    }
  }

  async urlsList (req, res, next) {
    debug(`URL: ${chalk.green('getting registers')}`)
    let uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'))
    let urls = await URLService.getAllUrls()
    if (urls !== null) {
      res.send(response.success(urls, 200, uri))
    } else {
      res.status(404).send(response.error('Empty data', 404, uri, 'No se han podido obtener las urls'))
    }
  }

  async createUrlBulk (req, res, next) {
    debug(`URL: ${chalk.green('creaing a bulk of registers')}`)
    let body = req.body
    let uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'))
    let urls = await URLService.createUrlBulk(body.urls, req.get('host'))
    if (urls !== null) {
      res.send(response.success(urls, 200, uri))
    } else {
      res.status(400).send(response.error('Empty data', 400, uri, 'No se han podido crear las urls.'))
    }
  }
}

module.exports = new URLController()
