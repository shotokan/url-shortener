'use strict'

/**
 * authoe: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Controlador que tiene la función de redireccionar mediante una url corta hacia la url original.
 */

const debug = require('debug')('url-shortener:api:controller:redirect')
const chalk = require('chalk')

const URLService = require('../services/url')

class URLController {
  async redirect (req, res, next) {
    let code = req.params.code
    debug(`REDIRECT: ${chalk.green('redirecting')} ${code}`)

    console.log(req.get('host'))
    if (code.replace(/\s+/, '') === '') {
      next()
    }
    let url = await URLService.getUrlByCode(code)
    if (url === null || url === '') {
      console.log(url)
      next()
    } else {
      res.redirect(url.original)
    }
  }
}

module.exports = new URLController()
