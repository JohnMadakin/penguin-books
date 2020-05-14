const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },       
         ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[ext]',
            },
          },
        ],
      },

    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true
  },
  devtool: 'source-map',
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
};

module.exports = config;