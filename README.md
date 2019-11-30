## create-kkt

[![](https://img.shields.io/github/issues/kktjs/create-kkt.svg)](https://github.com/kktjs/create-kkt/issues)
[![](https://img.shields.io/github/forks/kktjs/create-kkt.svg)](https://github.com/kktjs/create-kkt/network)
[![](https://img.shields.io/github/stars/kktjs/create-kkt.svg)](https://github.com/kktjs/create-kkt/stargazers)
[![](https://img.shields.io/github/release/kktjs/create-kkt)](https://github.com/kktjs/create-kkt/releases)
[![](https://img.shields.io/npm/v/create-kkt.svg)](https://www.npmjs.com/package/create-kkt)

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
Usage: create-kkt <app-name> [options]

Options:
  --version      Show version number                                   [boolean]
  --example, -e  Example from
                 https://github.com/kktjs/kkt-next/tree/master/example
                 example-path                        [string] [default: "basic"]
  --path, -p     Specify the download target git address.
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
