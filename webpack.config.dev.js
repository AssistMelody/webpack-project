const commonConfig = require('./webpack.config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsWebpackPlugin = require('handlebars-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const fs = require('fs');
const chalk = require('chalk');

module.exports = () => {
  const mockData = process.env.MOCK_DATA;
  if (!mockData) {
    console.log(chalk.yellow('没有指定数据，使用 data/default.json'));
  } else {
    if (!fs.existsSync(`./src/data/${mockData}.json`)) {
      throw new Error(`指定数据文件未找到:./src/data/${mockData}.json:`);
    }
  }
  return merge(commonConfig, {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
        },
      ],
    },
    plugins: [
      new HandlebarsWebpackPlugin({
        entry: path.join(process.cwd(), 'src', 'main.hbs'),
        output: path.join(process.cwd(), '.build', '[name].html'),
        getPartialId: (filePath) => {
          const basename = path
            .dirname(filePath)
            .split('/')
            .pop()
            .toLocaleUpperCase()
            .replace(/-/g, '_');
          if (basename === 'BASE_TEXT') {
            return 'text';
          }
          return `${basename}`;
        },
        helpers: {
          moduleType: (obj, type) => {
            return obj[type];
          },
          isRight: (value) => {
            return value == 'RIGHT';
          },
        },
        partials: [
          path.join(process.cwd(), 'src', 'base-modules', '*', '*.hbs'),
          path.join(process.cwd(), 'src', 'premium', '*', '*.hbs'),
        ],
        data: require(`./src/data/${mockData || 'default'}.json`),
      }),
      new HtmlWebpackPlugin({
        template: '.build/main.html',
        filename: 'index.html',
        chunks: ['mkt-aplus'],
      }),
    ],
  });
};
