const path = require('path');
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_IP: JSON.stringify(process.env.SERVER_IP),
        PORT: JSON.stringify(process.env.PORT),
      },
    }),
  ],
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      url: require.resolve('url/'),
      util: require.resolve('util/'),
      vm: require.resolve('vm-browserify'), // Add this line for the `vm` module
      buffer: require.resolve('buffer/'), // Ensure `buffer` is also included
    },
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      'node_modules',
      '/src/tests',
    ],
  },
};
