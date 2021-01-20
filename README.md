## create-kkt

[![Build](https://github.com/kktjs/create-kkt/workflows/Build/badge.svg)](https://github.com/kktjs/create-kkt/actions) [![](https://img.shields.io/github/issues/kktjs/create-kkt.svg)](https://github.com/kktjs/create-kkt/issues) [![](https://img.shields.io/github/forks/kktjs/create-kkt.svg)](https://github.com/kktjs/create-kkt/network) [![](https://img.shields.io/github/stars/kktjs/create-kkt.svg)](https://github.com/kktjs/create-kkt/stargazers) [![](https://img.shields.io/github/release/kktjs/create-kkt)](https://github.com/kktjs/create-kkt/releases) [![](https://img.shields.io/npm/v/create-kkt.svg)](https://www.npmjs.com/package/create-kkt)

Creates a [kkt](https://github.com/kktjs/kkt) application using the command line.

### Usage

```shell
$ yarn create kkt [appName]
# or npm
$ npm create kkt my-app
# or npx
$ npx create-kkt my-app
```

or

```bash
$ npm i create-kkt -g
```

### Command Help

Below is a help of commands you might find useful. The example download is from https://kktjs.github.io/zip/

```bash
Usage: create-kkt <app-name> [options] [--help|h]

Options:
  --version, -v Show version number
  --help, -h Displays help information.
  --example, -e Example from: https://kktjs.github.io/zip/ , default: "basic"
  --force, -f Overwrite target directory if it exists. default: false
  --path, -p Specify the download target git address. default: "https://kktjs.github.io/zip/"

Example:
  npx create-kkt my-app
  yarn create kkt appName
  npm create kkt my-app
  npm create kkt my-app -f
  npm create kkt my-app -p https://kktjs.github.io/zip/

Copyright 2021
```

## Development

```bash
npm run watch # Listen compile .ts files.
npm run build # compile .ts files.
```

## License

[MIT © Kenny Wong](https://github.com/kktjs/kkt/blob/master/LICENSE)
