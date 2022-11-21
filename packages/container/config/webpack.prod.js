const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// This environment variable is going to be defined when we build our application through our CI/CD pipeline.
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // not required for a host module
      remotes: { // So where we should go to to get some source code.
        marketing: `marketing@${domain}/marketing/remoteEntry.js`, //that key needs to match up to the first part of some import statement inside of our container project.
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

// So   filename: '[name].[contenthash].js' ensures that whenever we build some files for production, all the different files that are built are gonna use this as a template to figure out how to name them.
// We're gonna first put down the name of the file that was created, and then a hash of the contents of the file.
// When we set mode to production that's gonna cause webpack to run slightly differently. It's gonna make sure that all the JavaScript files that are built get somewhat optimized.
//We need to add a script to our package.json file to make sure that we can actually build everything for production.  - > "build": "webpack --config config/webpack.prod.js"