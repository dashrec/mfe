const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/marketing/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);


// publicPath: '/marketing/latest/' <-- So, the remote entry file is gonna contain a list of URLs inside of it, and it's gonna say, "Hey, here's the exact URL to go to 
// to load up some kind of name dot js file, or maybe some node modules file or something like that."
// to say just go to the current domain slash marketing slash latest and then a slash at the very end.

//So again, pretty much the exact same thing we did  back inside of our container, back inside the container we set this up  so that all the different script tags inside of our html file
//  would refer to the correct location of all the different JavaScript files. In this case, we are sending it to public path, so that our remote entry file will
// point to the correct folder inside of our S3 bucket.