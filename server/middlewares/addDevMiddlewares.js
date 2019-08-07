const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxy = require('http-proxy-middleware')
// const host = 'http://localhost:8080/'
const host = 'http://172.30.0.62:3002' // 'http://58.63.115.100:8100'

function createWebpackMiddleware (compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    publicPath,
    silent: true,
    stats: 'errors-only'
  })
}

module.exports = function addDevMiddlewares (app, webpackConfig) {
  const compiler = webpack(webpackConfig)
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath
  )

  // FIXME
  app.use(['/api/v3'], proxy({target: host, changeOrigin: true}))
  app.use(['/image'], proxy({target: host, changeOrigin: true}))
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.send(file.toString())
      }
    })
  })
}
