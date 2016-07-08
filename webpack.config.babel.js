const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env) {
  return (
    {
      devtool: env.dev ? 'source-map' : 'hidden-source-map',

      entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './source/demo/index'
      ],

      output: {
        path: 'build',
        filename: '/static/[name].js'
      },

      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          inject: true,
          template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
      ],

      resolve: {
        modules: [path.resolve(__dirname, 'source'), 'node_modules'],
        extensions: ['.js', '.json'],
        unsafeCache: true
      },

      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'source')
          }
        ]
      },

      devServer: {
        contentBase: 'build',
        port: 3000,
        hot: true
      }
    })
}
