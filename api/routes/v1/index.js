'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: se realiza la configuración de las rutas con sus respectivos controladores.
 */

const debug = require('debug')('url-shortener:api:routes')
const chalk = require('chalk')

const ping = require('./ping')
const url = require('./url')

module.exports = (app, models) => {
  /**
     * @api {get} /v1/url/:code Request URL information
     * @apiName Redirect
     *
     * @apiParam {Uuid} code Users unique ID.
     *
     * @apiSuccess redirect to original url.
     *
     * @apiError CodeNotFound The code of the URL was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "CodeNotFound"
     *     }
     */
  app.get('/:code', (req, res, next) => {
    debug(`Routes: ${chalk.green('in route /v1/')}`)
    res.send({})
  })
  ping(app)
  url(app)
}
