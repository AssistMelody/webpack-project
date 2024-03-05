#!/usr/bin/env node

const { program } = require('commander');

program.usage('add [module-name]');

program
  .command('add')
  .description('add a new template')
  .action(() => {
    require('./commands/add');
  });

program.parse(process.argv);
