/** @jest-environment node */
import fs from 'fs-extra';
import path from 'path';
import { helpCli, helpExample, helpCopyright, run } from '../src';
import pkg from '../package.json';

const argv = process.argv.slice(0, 2);
console.log = jest.fn();

it('appName test case', async () => {
  // await fs.remove('test/my-app1')
  process.argv = argv;
  process.argv.push('my-app1');
  process.argv.push('-f');
  process.argv.push('--output');
  process.argv.push('test');
  await run();
  // expect(await run()).toBeUndefined();
  expect(await fs.existsSync(path.resolve(__dirname, 'my-app1'))).toBeTruthy();
  await fs.remove('test/my-app1');
});

it('version test case', async () => {
  process.argv = argv;
  process.argv.push('--version');
  expect(await run()).toBeUndefined();
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe(`\n create-kkt v${pkg.version}\n`);
});

it('help test case', async () => {
  process.argv = argv;
  expect(typeof helpCli).toEqual('string');
  expect(typeof helpExample).toEqual('string');
  expect(typeof helpCopyright).toEqual('string');
  process.argv.push('--help');
  expect(await run()).toBeUndefined();
});
