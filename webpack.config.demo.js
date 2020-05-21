/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const buildDir = path.resolve(__dirname, 'dist');

module.exports = {
  mode: env,
  entry: {
    main: './src/index.ts',
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
  },
  module: {
    rules: [
      { test: /\.html$/, loader: "file-loader?name=[name].[ext]" },
      {
        test: /\.ts|\.tsx$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          { loader: 'ts-loader',
            options: {
              compilerOptions: {
                incremental: true,
              },
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx','.ts', ".js"]
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${buildDir}/*` ],
    }),
    new HtmlWebpackPlugin({}),
    new ManifestPlugin(),
  ]
};