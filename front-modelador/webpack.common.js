const webpack = require('webpack');
const path = require('path');

module.exports = {
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js\.map$/,
        use: 'source-map',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, './src/config/'),
      '@layout': path.resolve(__dirname, './src/layout/'),
      '@providers': path.resolve(__dirname, './src/providers/'),
      '@services': path.resolve(__dirname, './src/services/'),
      '@shared': path.resolve(__dirname, './src/shared/'),
      '@assets': path.resolve(__dirname, './src/shared/assets/'),
      '@constants': path.resolve(__dirname, './src/shared/constants/'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks/'),
      '@libs': path.resolve(__dirname, './src/shared/libs/'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
};
