const path = require('path');

module.exports = {
  entry: {
    'mkt-aplus': './src/invoke-aplus.js',
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
    ],
  },
  devServer: {
    open: true,
    watchFiles: ['src/**/*'],
  },
  plugins: [],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  stats: 'errors-warnings',
};
