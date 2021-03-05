// eslint-disable-next-line
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// eslint-disable-next-line
const CircularDependencyPlugin = require('circular-dependency-plugin')

const isLib = process.env.NODE_ENV === 'lib'

module.exports = {
  chainWebpack(config) {
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
