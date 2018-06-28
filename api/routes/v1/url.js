const UrlController = require('../../controllers/url')

module.exports = app => {
  /**
     * @api {get} /v1/urls/ Request all registers in database.
     * @apiName UrlsList
     *
     * @apiSuccess return a list of registers.
     *
     * @apiError NotFound No se han podido obtener las urls.
     *
     */
  app.get('/v1/urls', UrlController.urlsList)
}
