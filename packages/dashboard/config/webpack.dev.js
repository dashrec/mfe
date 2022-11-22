const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: 'index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
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
// We only need this on our dashboard project because we're going to attempt to load up a couple of different font files and whatnot. And loading up these different files
// will be subject to a security policy called Cores. to allow us to load up some fonts when we are loading our application or viewing it from inside the container.