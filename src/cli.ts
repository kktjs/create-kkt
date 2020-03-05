#!/usr/bin/env node

import yargs from 'yargs';
import create from './create';

export const command = yargs
  .usage('Usage: $0 <app-name> [options]')
  .default('appName', 'my-app')
  .option('example', {
    alias: 'e',
    describe: 'Example from https://github.com/kktjs/kkt/tree/master/example example-path',
    type: 'string',
    default: 'basic',
  })
  .option('path', {
    alias: 'p',
    describe: 'Specify the download target git address.',
    type: 'string',
    default: 'https://github.com/kktjs/kkt',
  })
  .option('force', {
    alias: 'f',
    describe: 'Overwrite target directory if it exists.',
    default: false,
    type: 'boolean',
  })
  .fail((msg: string, err: any) => {
    if (err) throw err; // preserve stack
    console.error('You broke it!');
    console.error(msg);
    console.error('You should be doing', yargs.help());
    process.exit(1);
  })
  .help()
  .locale('en')
  .epilog('Copyright 2019 \n').argv;

create(command);
