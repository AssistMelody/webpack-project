#!/usr/bin/env node
// import style from './template/style.less.hbs';
const inquirer = require('inquirer');
const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const hbs = require('handlebars');

chalk.level = 1;

let question = [
  {
    type: 'list',
    name: 'type',
    choices: ['A+ Base', 'A+ Premium'],
    message: '请选择模块类型',
  },
  {
    name: 'name',
    type: 'input',
    message: '请输入模板名称',
    validate(val) {
      if (!val) {
        return 'Name is required!';
      } else {
        return true;
      }
    },
  },
];

function writeTemplate(directory, templateName) {
  return readFile(path.join(process.cwd(), `bin/template/${templateName}.hbs`), 'utf-8').then(
    (res) => {
      const { base } = path.parse(directory);
      const temp = hbs.compile(res);
      const content = temp({ moduleName: base });
      return writeFile(path.join(process.cwd(), `${directory}/${templateName}`), content, 'utf-8');
    },
  );
}

/**
 * @param {string} name
 */
function updateInvoke(name) {
  return readFile(path.join(process.cwd(), 'src/invoke-aplus.js'), 'utf-8').then((res) => {
    const content = res.split('\n');
    let index = -1;
    content.forEach((item, i) => {
      if (item.trim().startsWith('import')) {
        index = i;
      }
    });
    content.splice(index + 1, 0, `import './${name.replace('src/', '')}/index.js'`);
    return writeFile(path.join(process.cwd(), 'src/invoke-aplus.js'), content.join('\n'), 'utf-8');
  });
}

inquirer.prompt(question).then((answers) => {
  let { name, type } = answers;
  const directory = type === 'A+ Base' ? `src/base-modules/${name}` : `src/premium-modules/${name}`;
  if (fs.existsSync(path.join(process.cwd(), directory))) {
    console.log(chalk.red(`${directory}: Modules has already existed!`));
    return;
  }
  fs.mkdirSync(path.join(process.cwd(), directory), { recursive: true });
  Promise.all([
    writeTemplate(directory, 'index.js'),
    writeTemplate(directory, 'template.hbs'),
    writeTemplate(directory, 'style.less'),
  ])
    .then(() => {
      console.log('\n');
      console.log(chalk.green(`${directory}: create successfully!\n`));
      updateInvoke(directory)
        .then((res) => {
          console.log(chalk.green('invoke-aplus.js update successfully!\n'));
          console.log(
            chalk.yellow(
              'please update mock data & run "npm run dev [mock-data]" to start the project!\n',
            ),
          );
        })
        .catch(() => {
          console.log(chalk.red('invoke-aplus.js update failed! please update manually!\n'));
        });
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
});
