/** @jest-environment node */
import { exampleHelp, run } from '../src/';

it('cliHelp test case', async () => {
  expect(exampleHelp()).toBeUndefined();
  // process.argv.push('-v');
  // expect(await run()).toBeUndefined();
  process.argv.push('--version');
  expect(await run()).toBeUndefined();
});

it('version test case', async () => {
  expect(exampleHelp()).toBeUndefined();
  process.argv.push('-h');
  expect(await run()).toBeUndefined();
});
