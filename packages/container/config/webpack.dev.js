const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');


const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [

    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
   // shared: ['react', 'react-dom'],
    shared: packageJson.dependencies,
    }),

 
  ],
};

module.exports = merge(commonConfig, devConfig);
//  the devConfig is going to override or kind of take priority over any other similar options that we might have assigned to common config.

// So this merge function is what's going to allow us to take all the config that we just wrote out inside that common file and merge it together with a configuration that we have inside this development file.