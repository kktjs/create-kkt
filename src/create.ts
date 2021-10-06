import fs from 'fs-extra';
import { ParsedArgs } from 'minimist';
import path from 'path';
import download from 'download';
import ora from 'ora';

export type CreateOptions = {
  appName?: string;
  f?: boolean;
  force?: boolean;
  e?: string;
  example?: string;
  o?: string;
  output?: string;
  p?: string;
  path?: string;
} & Omit<ParsedArgs, '_'>;

export async function create(argv: CreateOptions, exampleHelp: string) {
  const spinner = ora('Downloading Example.');
  try {
    if (!argv.appName || !/^[A-Za-z0-9_\-\.]{1,}$/.test(argv.appName)) {
      console.log(`\n  \x1b[31mPlease specify the project directory name\x1b[0m.
        ${
          !/^[A-Za-z0-9_\-\.]{1,}$/.test(argv.appName)
            ? `\x1b[31mThe name directory name\x1b[0m \x1b[33m${argv.appName}\x1b[0m \x1b[31mcontains special characters.\x1b[0m`
            : ''
        }
        ${exampleHelp || ''}
      `);
      return;
    }
    if (!argv.path || typeof argv.path !== 'string') {
      console.log(
        `\n  Uh oh! \x1b[31mPlease specify download address\x1b[0m. ${exampleHelp || ''}`,
      );
      return;
    }
    const projectPath = path.join(process.cwd(), argv.output, argv.appName);
    if (argv.force) {
      await fs.remove(projectPath);
      await fs.ensureDir(projectPath);
    } else if (fs.existsSync(projectPath)) {
      console.log(`
        Uh oh! Looks like there's already a directory called \x1b[31m${argv.appName}\x1b[0m\n
        \x1b[33mPlease try a different name or delete that folder.\x1b[0m\n
          Path: \x1b[33m${projectPath}\x1b[0m\n
      `);
      process.exit(1);
    }
    await fs.ensureDir(projectPath);
    spinner.start(`\nDownloading \x1b[32m${argv.example}.zip\x1b[0m example.`);
    await download(`${argv.path}${argv.example}.zip`, projectPath, {
      extract: true,
    }).on('downloadProgress', (progress) => {
      if (progress.percent !== 1) {
        spinner.text = `The example \x1b[32m${argv.example}.zip\x1b[0m has been downloaded ${(
          progress.percent * 100
        ).toFixed(0)}%.`;
      } else {
        spinner.text = `Unzip the \x1b[32m${argv.example}.zip\x1b[0m file.`;
      }
    });
    spinner.succeed(`Creating a new app in \x1b[32m${projectPath}\x1b[0m! \n`);

    const pkgPath = path.resolve(projectPath, 'package.json');

    let logstr = `Success! Created \x1b[35m${argv.appName}\x1b[0m at \x1b[32m${projectPath}\x1b[0m\n`;
    if (fs.existsSync(pkgPath)) {
      const pkg = require(pkgPath);
      if (pkg.version) {
        await fs.writeJSON(pkgPath, { ...pkg, version: '1.0.0' }, { spaces: '  ' });
      }
      logstr += `\nInside that directory, you can run several commands:\n`;
      if (pkg.scripts) {
        Object.keys(pkg.scripts).forEach((keyname) => {
          logstr += `   \x1b[36myarn run ${keyname}\x1b[0m\n`;
          logstr += `    └─> ${pkg.scripts[keyname]}\n`;
        });
      }
      logstr += '\nWe suggest that you begin by typing:\n';
      logstr += `   \x1b[36mcd ${argv.appName}\x1b[0m\n`;
      logstr += '   \x1b[36myarn install\x1b[0m\n';
      logstr += '   \x1b[36myarn build\x1b[0m && \x1b[36myarn start\x1b[0m\n';
    }
    logstr += '\nHappy hacking!\n';
    console.log(logstr);
  } catch (error) {
    spinner.fail(`\x1b[31m${error.message}\x1b[0m\n  Error: \x1b[31m${
      error.statusCode || '000'
    }\x1b[0m, The example \x1b[31m${argv.example}.zip\x1b[0m does not exist.
    \n  Download link: \x1b[31m${argv.path}${argv.example}.zip\x1b[0m
    `);
    process.exit(1);
  }
}
