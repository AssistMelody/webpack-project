const path = require('path');

module.exports = {
  entry: {
    'mkt-aplus': './src/invoke-aplus.js',
    comment: './src/comment/index.ts',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              additionalData: `@import "@/variable.less";`,
            },
          },
        ],
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    open: true,
    watchFiles: ['src/**/*'],
  },
  plugins: [],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  stats: 'errors-warnings',
};
