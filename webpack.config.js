const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    '@babel/polyfill', './src/server.js'
  ],
  output: {
    path:     path.join(__dirname, './dist'),
    filename: 'server.js'
  },
  target: 'node',
  externals: [ nodeExternals() ],
  module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    }
};
