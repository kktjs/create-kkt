## create-kkt

Creates a [kkt-next](https://github.com/kktjs/kkt-next) application using the command line.

### Usage

```shell
$ yarn create kkt [appName]
# or npm
$ npm create kkt my-app
# or npx
$ npx create kkt my-app
```

### Command Help

Below is a help of commands you might find useful.

```bash
Usage: cli.js <app-name> [options]

Options:
  --version      Show version number                                   [boolean]
  --example, -e  Example from
                 https://github.com/kktjs/kkt-next/tree/master/example
                 example-path                        [string] [default: "basic"]
  --path, -p     Example from
                 https://github.com/kktjs/kkt-next/tree/master/example
                 example-path
                         [string] [default: "https://github.com/kktjs/kkt-next"]
  --force, -f    Overwrite target directory if it exists.
                                                      [boolean] [default: false]
  --help         Show help                                             [boolean]
  --appName                                                  [default: "my-app"]

Copyright 2019
```

## Development

```bash
npm run watch # Listen compile .ts files.
npm run build # compile .ts files.
```
