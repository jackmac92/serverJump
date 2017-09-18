const path = require('path');
module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: path.resolve(__dirname, 'index.js'),
  output: { filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  target: 'node',
};
