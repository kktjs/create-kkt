import fs from 'fs-extra';
import color from 'colors-cli';
import path from 'path';
import { command } from '../cli';
import { run } from '../utils/run';
import { moverDir } from '../utils/moverDir';

export default async (argv: typeof command) => {
  const appName = argv._[0] ? argv._[0] : argv.appName;
  const projectPath = path.join(process.cwd(), appName);
  const cacheDirPath = path.join(projectPath, '.cache-kkt');
  const exampleDirPath = path.join(projectPath, '.cache-kkt', 'example', argv.example);
  try {
    if (argv.force) {
      await fs.remove(projectPath);
      await fs.ensureDir(projectPath);
      await fs.ensureDir(cacheDirPath);
    } else if (fs.existsSync(projectPath)) {
      console.log(
        `\n Uh oh! Looks like there's already a directory called ${color.red(appName)}\n`,
        `${color.yellow('Please try a different name or delete that folder.')}\n`,
        `Path: ${color.yellow(projectPath)}`,
      );
      process.exit(1);
    }
    await fs.ensureDir(projectPath);
    const gitArgs = [ 'clone', 'https://github.com/kktjs/kkt.git', '--depth', '1', cacheDirPath];
    console.log(`\nDownloading files for ${color.green(argv.example)} example`);
    await run('git', gitArgs, projectPath);
    if (!fs.existsSync(exampleDirPath)) {
      console.log('>>', exampleDirPath);
      console.log(`Error: The example ${color.red(argv.example)} does not exist!`);
      process.exit(1);
    }
    const pkgPath = path.join(cacheDirPath, 'package.json');
    const examplePkgPath = path.join(exampleDirPath, 'package.json');
    const kktPkg = require(pkgPath);
    const examplePkg = require(examplePkgPath);
    const files = await moverDir(exampleDirPath, projectPath);
    if (examplePkg.dependencies && examplePkg.dependencies.kkt) {
      examplePkg.dependencies.kkt = kktPkg.version;
    }
    if (examplePkg.devDependencies && examplePkg.devDependencies.kkt) {
      examplePkg.devDependencies.kkt = kktPkg.version;
    }

    const projectPkgPath = path.join(projectPath, 'package.json');
    await fs.remove(cacheDirPath);
    await fs.remove(projectPkgPath);
    await fs.outputFile(projectPkgPath, JSON.stringify(examplePkg, null, 2));

    console.log(
      `🎉 ${color.green('✔')} successfully initialized ${color.cyan(appName)} project.`,
    );
    // console.log(`🎉  ${color.green('✔')} successfully installed ${color.cyan(appName)} dependencies..`);
    console.log(
      '\n  Inside that directory, you can run several commands:\n\n',
      `  ${color.x243('$')} ${color.green('npm watch')}\n`,
      `    Starts the development\n\n`,
      `  ${color.x243('$')} ${color.green('npm build')}\n`,
      `    Bundles the app files for production.\n\n`,
      `  We suggest that you begin by typing:\n\n`,
      `   ${color.green('cd')} ${appName}\n`,
      `   ${color.green('npm install')}\n`,
    );
  } catch (error) {
    console.log(error);
  }
};
