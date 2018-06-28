'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Módulo que proporciona los datos a los stubs para simular con las pruebas.
 */

const url = {
  uuid: '23b7eaca-a201-4a80-9e61-6ad77747ad62',
  original: 'https://facebook.com',
  short: 'http://localhost/Ux26Yp',
  visits: 0,
  code: 'Ux26Yp',
  updatedAt: new Date()
}

const urls = [
  url,
  extend(url, {uuid: 'bcb6b3a4-e5fc-458a-98ec-ab8029656830', original: 'https://www.google.com', short: 'http://localhost/Ux56Xy', code: 'Ux56Xy', visits: 2}),
  extend(url, {uuid: '77bf4a97-3908-47cc-9d2a-e81c16fef138', code: 'Yy66Zx', original: 'https://www.outlook.com', short: 'http://localhost/Yy66Zx'}),
  extend(url, {uuid: 'a787121f-a234-41e2-8113-8a91b0cc91d9', original: 'https://wecodetheweb.com/2016/04/19/effortless-unit-testing-with-ava/', short: 'http://localhost/Yz76Xh', code: 'Yz76Xh', visits: 2})
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: url,
  all: urls,
  newUrl: async (url) => {
    // const urlCode = shortid.generate()
    // const shortUrl = `http://${host}/${urlCode}`
    let newUrl = {
      uuid: url.uuid,
      original: url.original,
      short: url.short,
      code: url.code,
      visits: 0,
      updatedAt: new Date()
    }
    urls.push(newUrl)
    console.log('ESTA EN NEWURL')
    console.log(newUrl)
    console.log('ESTA EN NEWURL')
    return newUrl
  },
  byShortUrl: short => urls.filter(a => a.short === short).shift(),
  byCode: code => urls.filter(a => a.code === code).shift(),
  byUuid: id => urls.filter(a => a.uuid === id).shift(),
  getList: () => urls
}
