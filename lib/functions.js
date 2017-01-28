var fs = require('fs')
var Canvas = require('canvas')
var env = process.env.NODE_ENV || 'development'
var config = require(__dirname + '/../config/config.json')[env]

function createPngImage (params) {
  var canvas = new Canvas(params.fileWidth, params.fileHeight)
  var ctx = canvas.getContext('2d')
  ctx.font = params.size + ' Impact'
  ctx.fillStyle = params.background
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = params.color
  ctx.fillText(params.text, params.textStartCoords[0], params.textStartCoords[1])
  var stream = canvas.pngStream()
  return writeImageToDisk(stream, params.fileName)
}

function writeImageToDisk (stream, fileName) {
  var out = fs.createWriteStream(__dirname + '/../' + config.uploadPath + fileName)
  return new Promise(function (resolve, reject) {
    stream.on('data', function (add) {
      out.write(add)
    })
    stream.on('end', function () {
      return resolve(true)
    })
    stream.on('error', function () {
      return reject(false)
    })
  })
}

module.exports = {
  createPngImage: createPngImage

}
