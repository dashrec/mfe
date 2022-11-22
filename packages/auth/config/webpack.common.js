module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};

// whenever we import in a file that ends with an extension of either mjs or just js, we want it to be processed by bable.
// do not try to run this bable thing on any file out of our node modules directory.

