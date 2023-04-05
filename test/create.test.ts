/** @jest-environment node */
import fs from 'fs-extra';
import { create, CreateOptions } from '../src/create';
import { helpExample } from '../src';

console.log = jest.fn();

it('create project. 1', async () => {
  const opts: CreateOptions = {};
  await create(opts, '');
  expect(
    // @ts-ignore
    console.log.mock.calls[0][0].indexOf('Please specify the project directory name') > -1,
  ).toBeTruthy();
});

it('create project. 2', async () => {
  const opts: CreateOptions = {};
  await create(opts, helpExample);
  // @ts-ignore
  expect(console.log.mock.calls[0][0].indexOf('Example:') > -1).toBeTruthy();
});

it('create project. options => appName', async () => {
  const opts: CreateOptions = { appName: 'my-app' };
  await create(opts, helpExample);
  // @ts-ignore
  expect(console.log.mock.calls[0][0].indexOf('my-app') > -1).toBeTruthy();
});

it('create project. options => appName', async () => {
  const opts: CreateOptions = { appName: [] as any };
  await create(opts, '');
  // @ts-ignore
  expect(console.log.mock.calls[0][0].indexOf('The name directory nam') > -1).toBeTruthy();
});

it('create project. options => path', async () => {
  const opts: CreateOptions = { appName: 'my-app', path: [] as any };
  await create(opts, '');
  // @ts-ignore
  expect(console.log.mock.calls[0][0].indexOf('Please specify download address') > -1).toBeTruthy();
});

it('create project. options => force/example', async () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation();
  const opts: CreateOptions = {
    force: true,
    output: 'test',
    appName: 'my-app',
    path: 'https://kktjs.github.io/zip/',
  };
  await create(opts, '');
  expect(mockExit).toHaveBeenCalledWith(1);
  mockExit.mockRestore();
}, 3000);

it('create project. options => force', async () => {
  await fs.ensureDir('test/my-app');
  const mockExit = jest.spyOn(process, 'exit').mockImplementation();
  const opts: CreateOptions = {
    output: 'test',
    appName: 'my-app',
    path: 'https://kktjs.github.io/zip/',
  };
  await create(opts, '');
  expect(
    // @ts-ignore
    console.log.mock.calls[0][0].indexOf("Looks like there's already a directory called") > -1,
  ).toBeTruthy();
  expect(mockExit).toHaveBeenCalledWith(1);
  mockExit.mockRestore();
}, 6000);

it('create project. options => example', async () => {
  const opts: CreateOptions = {
    force: true,
    output: 'test',
    example: 'basic',
    appName: 'my-app',
    path: 'https://kktjs.github.io/zip/',
  };
  await create(opts, '');
  // @ts-ignore
  expect(console.log.mock.calls[0][0].indexOf('Success! Created') > -1).toBeTruthy();
  await fs.remove('test/my-app');
}, 8000);
