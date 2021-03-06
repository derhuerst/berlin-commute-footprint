# berlin-commute-footprint

**Compare cost, environmental and health impact of commuting by car, public transport of bike.** Library behind [umsteigen.jetzt](https://umsteigen.jetzt), originally written by @juliuste.

*Note:* This library is a **work in progress** project! Although we tried to finde proper sources for the calculations, it is *not* scientifically verified.

[![npm version](https://img.shields.io/npm/v/berlin-commute-footprint.svg)](https://www.npmjs.com/package/berlin-commute-footprint)
[![build status](https://img.shields.io/travis/derhuerst/berlin-commute-footprint.svg)](https://travis-ci.org/derhuerst/berlin-commute-footprint)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/berlin-commute-footprint.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install berlin-commute-footprint
```


## Usage

```js
const vbb = require('vbb-client')
const footprint = require('berlin-commute-footprint')

vbb.journeys('900000003201', '900000024101', {results: 1})
.then(([journey]) => footprint(journey))
.then(console.log, console.error)
```

```js
// todo
```


## Contributing

If you have a question or have difficulties using `berlin-commute-footprint`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/berlin-commute-footprint/issues).
