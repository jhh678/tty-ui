var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var isTest = process.env.NODE_ENV === 'test'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction ? config.build.productionSourceMap : isTest ? config.test.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction || isTest
  })
}
