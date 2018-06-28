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

  /**
     * @api {post} /v1/urls/ Receives a url and creates a new short url and save it into database.
     * @apiName createUrl
     *
     * @apiSuccess return an url object.
     *
     * @apiError NotFound No se han podido obtener las urls.
     *
     */
  app.post('/v1/urls', UrlController.createUrl)
}
