const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env) {
  const baseConfig = {
    devtool: 'hidden-source-map',
    entry: ['./source/demo/index.js'],
    output: {
      path: 'build',
      filename: 'static/[name].js'
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
    resolve: {
      modules: [path.resolve(__dirname, 'source'), 'node_modules'],
      extensions: ['.js', '.json'],
      unsafeCache: env.dev
    }
  }

  const devConfig = {
    devtool: 'source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './source/demo/index'
    ],
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: './index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    devServer: {
      contentBase: 'build',
      port: 3000,
      hot: true
    }
  }

  const demoConfig = {
    entry: {demo: './source/demo/index.js'},
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: './index.html'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]

  }

  const umdConfig = {
    entry: {'react-flex-accordion': './source/index.js'},
    output: {
      path: 'dist/umd',
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'react-flex-accordion'
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDOM'
      }
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: true,
        comments: true,
        mangle: false
      })
    ]
  }

  return Object.assign(
    baseConfig,
    env.dev ? devConfig : {},
    env.umd ? umdConfig : {},
    env.demo ? demoConfig : {}
  )
}
