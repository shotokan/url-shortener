'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Controlador con los métodos para realizar la creación y obtención de las urls cortas.
 */

const URLService = require('../services/url')
const response = require('../utils/response')
const utils = require('../utils')
class URLController {
  async urlsList (req, res, next) {
    let uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'))
    let urls = await URLService.getAllUrls()
    if (urls !== null) {
      res.send(response.success(urls, 200, uri))
    } else {
      res.status(404).send(response.error('Empty data', 404, uri, 'No se han podido obtener las urls'))
    }
  }
}

module.exports = new URLController()
