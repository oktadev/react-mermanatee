/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

const CleanPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const buildDir = path.resolve(__dirname, 'dist');

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};
const reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};
const classnamesExternal = {
  root: 'classnames',
  commonjs2: 'classnames',
  commonjs: 'classnames',
  amd: 'classnames'
};

const webpackConfig = {
  mode: env,
  entry: {
    main: './src/index.ts',
  },
  externals: {
    'react': reactExternal,
    'react-dom': reactDOMExternal,
    'classnames': classnamesExternal,
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: buildDir,
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'Mermanatee',
    // lame workaround to get server side rendering working. see https://github.com/webpack/webpack/issues/6784
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
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
      }
    ]
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  },
  devtool: 'source-map',
  plugins: []
};

const plugins = [
  new CleanPlugin([
    `${buildDir}/*`,
  ]),
  new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
  new ManifestPlugin(),
];

if (env === "production") {
  webpackConfig.optimization.minimizer = [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
  ];
}

webpackConfig.plugins = plugins;

module.exports = webpackConfig;
