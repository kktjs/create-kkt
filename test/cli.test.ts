/** @jest-environment node */
import fs from 'fs-extra';
import path from 'path';

console.log = jest.fn();

const argv = process.argv.slice(0, 2);

describe('create project. 1', () => {
  const tempPath = path.resolve(__dirname, 'my-app2');
  beforeAll(async () => {
    process.argv = argv;
    process.argv.push('my-app2');
    process.argv.push('-f');
    process.argv.push('--output');
    process.argv.push('test');
    await fs.ensureDir(tempPath);
    await import('../src/cli');
  });

  test('create project. 1', async () => {
    expect(await fs.existsSync(tempPath)).toBeTruthy();
  });
});
