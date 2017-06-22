'use strict'

const vbb = require('vbb-client')
const footprint = require('.')

vbb.journeys('900000003201', '900000024101', {results: 1})
.then(([journey]) => footprint(journey))
.then((data) => {
	console.log(data)
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
