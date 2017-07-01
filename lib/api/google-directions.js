'use strict'

const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const qs = require('querystring')

const KEY = process.env.GOOGLE_API_KEY
if (!KEY) {
	// todo: throw an error instead of killing the process
	console.error('Missing GOOGLE_API_KEY env var.')
	process.exit(1)
}

const endpoint = 'https://maps.googleapis.com/maps/api/directions/json'

const queryGoogleDirections = (query) => {
	query.KEY = KEY
	return fetch(endpoint + '?' + qs.stringify(query), {
		mode: 'cors',
		redirect: 'follow',
		headers: {
			'User-Agent': 'https://github.com/derhuerst/berlin-commute-footprint'
		}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res.json()
	})
}

module.exports = queryGoogleDirections
