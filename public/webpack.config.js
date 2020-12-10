const path = require('path');
module.exports = {
  entry: './public/main.js',
  target: 'web',
  devtool: 'eval-source-map',
  output: {
    filename: './bundle.js',
    path: path.resolve('public'),
  },
  watch: true
};
