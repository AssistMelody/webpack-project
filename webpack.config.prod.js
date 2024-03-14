const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnvPlugin = require('dotenv-webpack');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: {
    midas: './src/bootstrap.js',
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              additionalData: `@import "@/variable.less";`,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        comment: {
          test: /[\\/]node_modules[\\/]/,
          name: 'runtime',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TIME: Date.now(),
    }),
    new DotEnvPlugin({
      path: path.resolve(__dirname, `./env/.${process.env.CURRENT_ENV}.env`),
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'template/comment.html',
      filename: 'comment.html',
      chunks: ['comment'],
    }),
  ],
});
