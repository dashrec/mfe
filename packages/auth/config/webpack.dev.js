const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: 'index.html',
    },
    historyApiFallback: true,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
  //   shared: ['react', 'react-dom'],
    shared: packageJson.dependencies,   // it ensures to load only one copy of dependencies in browser to avoid duplication of dependencies
    }),

    new HtmlWebpackPlugin({
     template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
//  the devConfig is going to override or kind of take priority over any other similar options that we might have assigned to common config.

// So this merge function is what's going to allow us to take all the config that we just wrote out inside that common file and merge it together with a configuration that we have inside this development file.