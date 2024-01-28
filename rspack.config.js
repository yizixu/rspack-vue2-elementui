const rspack = require('@rspack/core')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')
const { name: packageName } = require('./package.json')
const isProd = /production/i.test(process.env.NODE_ENV)

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: './src/main.js'
  },
  output: isProd
    ? {
        filename: 'static/js/[name].[contenthash:8].js',
        cssFilename: 'static/css/[name].[contenthash:8].css',
        assetModuleFilename: 'static/asset/[name].[hash][ext][query]',
        publicPath: process.env.VUE_APP_PUBLIC_PATH,
        clean: true
      }
    : {},
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devtool: false,
  plugins: [
    new NodePolyfillPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: packageName
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: './public'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              experimentalInlineMatchResource: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        type: 'css'
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'sass-loader'
        ],
        type: 'css'
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg|woff|woff2|eot|ttf)$/i,
        type: 'asset/resource'
      },
      {
        test: /^BUILD_ID$/,
        type: 'asset/source'
      },
      {
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              rspackExperiments: {
                import: [
                  {
                    libraryName: 'element-ui',
                    styleLibraryDirectory: 'lib/theme-chalk'
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
module.exports = config
