import execa from 'execa';

export function run(command: string, args: string[], cwd: string) {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }
  // console.log('this:', this);
  return execa(command, args, { cwd });
}
