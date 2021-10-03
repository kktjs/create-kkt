/** @jest-environment node */
import path from 'path';
import FS from 'fs-extra';
import { create, CreateOptions } from '../src/create';

it('create project.', async () => {
  jest.spyOn(process, 'exit').mockImplementation();
  const opts: CreateOptions = {
    _: ['my-app'],
    f: true,
    force: true,
    e: 'basic',
    example: 'basic',
    path: 'https://kktjs.github.io/zip/',
    p: 'https://kktjs.github.io/zip/',
    output: 'test',
    o: 'test',
    appName: 'my-app',
  };
  await create(opts, () => {});
  const output = path.join(process.cwd(), 'test', 'my-app');
  expect(FS.existsSync(output)).toBeTruthy();
  const dirs = await FS.readdir(output);
  expect(dirs).toEqual(['.gitignore', 'README.md', 'package.json', 'public', 'src']);
  const pkg = await FS.readJSON(path.join(output, 'package.json'));
  expect(pkg.version).toEqual('1.0.0');
  expect(Object.keys(pkg)).toEqual(expect.arrayContaining(['name', 'version']));
});
