/* eslint-disable */
require('dotenv').config()

const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const Dotenv = require('dotenv-webpack')
// const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

module.exports = withLess({
  // https://github.com/zeit/next-plugins/tree/master/packages/next-less
  cssModules: false,
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables // make your antd custom effective
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // https://github.com/zeit/next-plugins/pull/315
      // temporary fix not working
      // new FilterWarningsPlugin({
      //   exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      // }),

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  }
})
