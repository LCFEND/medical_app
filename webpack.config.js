const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Specify the entry point of your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output folder
    filename: 'bundle.js', // Output file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        exclude: /node_modules/,
        use: 'babel-loader', // Use Babel to compile JS
      },
      {
        test: /\.css$/, // Process CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(), // Minify JavaScript
    new MiniCssExtractPlugin({ filename: 'styles.css' }), // Extract CSS
  ],
};
