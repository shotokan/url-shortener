'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: se realiza la configuración de las rutas con sus respectivos controladores.
 */

const RedirectController = require('../../controllers/redirect')
const ping = require('./ping')
const url = require('./url')

module.exports = (app, models) => {
  /**
     * @api {get} /:code Request URL information
     * @apiName Redirect
     *
     * @apiParam {code} code for short url.
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
  app.get('/:code', RedirectController.redirect)
  ping(app)
  url(app)
}
