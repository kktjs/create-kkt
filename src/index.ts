import minimist from 'minimist';

import { create, CreateOptions } from './create';
export * from './create';

export async function run(): Promise<void> {
  try {
    const argvs: CreateOptions = minimist(process.argv.slice(2), {
      alias: {
        output: 'o',
        force: 'f',
        path: 'p',
        example: 'e',
      },
      default: {
        path: 'https://kktjs.github.io/zip/',
        output: '.',
        force: false,
        example: 'basic',
      },
    });
    if (argvs.h || argvs.help) {
      console.log(`${helpCli}${helpExample}${helpCopyright}`);
      return;
    }
    const { version } = require('../package.json');
    if (argvs.v || argvs.version) {
      console.log(`\n create-kkt v${version}\n`);
      return;
    }
    argvs.appName = argvs._[0];
    argvs.example = argvs.e = String(argvs.example).toLocaleLowerCase();
    await create(argvs, helpExample);
  } catch (error) {
    console.log(`\x1b[31m${error.message}\x1b[0m`);
    console.log(error);
    process.exit(1);
  }
}

export const helpCli = `\n  Usage: create-kkt <app-name> [options] [--help|h]
  Options:
    --version, -v  Show version number
    --help, -h     Displays help information.
    --output, -o   Output directory.
    --example, -e  Example from: \x1b[34mhttps://kktjs.github.io/zip/ \x1b[0m , default: "basic"
    --force, -f    Overwrite target directory if it exists. default: false
    --path, -p     Specify the download target git address. default: "\x1b[34mhttps://kktjs.github.io/zip/ \x1b[0m"
`;
export const helpExample: string = `\n  Example:

    \x1b[35myarn\x1b[0m create kkt \x1b[33mappName\x1b[0m
    \x1b[35mnpx\x1b[0m create-kkt \x1b[33mmy-app\x1b[0m
    \x1b[35mnpm\x1b[0m create kkt \x1b[33mmy-app\x1b[0m
    \x1b[35mnpm\x1b[0m create kkt \x1b[33mmy-app\x1b[0m -f
    \x1b[35mnpm\x1b[0m create kkt \x1b[33mmy-app\x1b[0m -p \x1b[34mhttps://kktjs.github.io/zip/\x1b[0m
`;
export const helpCopyright: string = `\n  Copyright 2021`;
