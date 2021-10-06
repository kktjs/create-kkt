/** @jest-environment node */
import fs from 'fs-extra';
import path from 'path';

console.log = jest.fn();

const argv = process.argv.slice(0, 2);

it('create project. 1', async () => {
  process.argv = argv;
  process.argv.push('my-app2');
  process.argv.push('-f');
  process.argv.push('--output');
  process.argv.push('test');
  // console.log(process.argv)
  await import('../src/cli');
  // console.log(path.resolve(__dirname, 'my-app2'))
  expect(await fs.existsSync(path.resolve(__dirname, 'my-app2'))).toBeTruthy();
  await fs.remove('test/my-app2');
});
