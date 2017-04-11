var path = require('path')
var plugins = []

var isDev = process.env.NODE_ENV !== 'production'
if (isDev) {
  var ae = require('after-effects')
  var afterfx = path.join(ae.scriptsDir, '../afterfx.exe')
  var WebpackShellPlugin = require('./WebpackShellPlugin')

  var shell = `"${afterfx}" -r ${path.join(__dirname, '../dist/Sp_memory.jsx')}`

  plugins = [
    new WebpackShellPlugin({
      onBuildEnd: [shell]
    })
  ]
}

module.exports = {
  entry: {
    app: path.join(__dirname, '../index.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'Sp_memory.jsx'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'lib': path.resolve(__dirname, '../lib'),
      'helper': path.resolve(__dirname, '../lib/HelperScripts')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
}