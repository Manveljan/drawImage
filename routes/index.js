var express = require('express')
var router = express.Router()
var Promise = require('bluebird')
var lib = require('../lib/functions.js')

// ///////////////// write comment
var params = [{
  text: 'bla bla bla',
  size: '32pt',
  color: '#ffffff',
  background: '#000000',
  fileWidth: 320,
  fileHeight: 320,
  textStartCoords: [12, 32],
  fileName: 'test.png'
}]

router.get('/', function (req, res) {
  return Promise.map(params, lib.createPngImage).then(function (result) {
    return res.json({status: result ? 'ok' : 'error'})
  })
})

module.exports = router
