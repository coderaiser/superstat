# Superstat [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/superstat.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/superstat/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/superstat.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/superstat "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/superstat  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/superstat "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

Smooth out differences between `stat` and `lstat`.

## Why?

Symbolic link stat returned by `lstat.isDirectory()` is always false
To know if a link is a directory we should call `stat.isDirectory()`
`stat.isSymbolicLink()` [is always false](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_stats_issymboliclink).

## Install
```
npm i superstat
```

## Example

Create symlink to root directory:

```sh
ln -s / hello
```

```js
const stat = await superstat('./hello');

stat.isDirectory()
// returns
true

stat.isSymbolicLink()
// returns
true
```

## License

MIT

[CoverageURL]:              https://coveralls.io/github/coderaiser/superstat?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/superstat/badge.svg?branch=master&service=github

