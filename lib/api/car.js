'use strict'

const config = require('config')
const fetch = require('node-fetch')
const qs = require('querystring')
const clone = require('clone')

const buildLocationString = (location) => `${location.latitude},${location.longitude}`

const extractData = (time) => (res) => ({
	// todo: loop all legs
	distance: (res.routes[0].legs[0].distance.value / 1000) + 4.5, // parking
	duration: (res.routes[0].legs[0].duration_in_traffic.value * 1000) + 10 * 60 * 1000,
	// source: https://www.siemens.com/press/pool/de/feature/2015/mobility/2015-02-smart-parking/hintergrundpapier-schluss-mit-der-parkplatzsuche-d.pdf
	departure: (time.type==='departure') ? time.value : time.value - (res.routes[0].legs[0].duration_in_traffic.value * 1000),
	arrival: (time.type==='arrival') ? time.value : time.value + (res.routes[0].legs[0].duration_in_traffic.value * 1000)
})

const transformResult = (res) => {
	res.legs = [Object.assign(clone(res), {type: 'car'})]
	return res
}

const route = (origin, destination, time) =>
	Promise.resolve().then(() => {
		const params = {
			origin: buildLocationString(origin),
			destination: buildLocationString(destination),
			key: config.api.google
		}
		if(time.type==='departure') params.departure_time = time.value/1000
		if(time.type==='arrival') params.arrival_time = time.value/1000
		return params
	}).then((params) => fetch(`https://maps.googleapis.com/maps/api/directions/json?${qs.stringify(params)}`))
	.then((res) => res.json())
	.then(extractData(time))
	.then(transformResult)
	// .then(console.log)
	// .catch(console.error)

// const ungarn = {
// 	latitude: 52.557758,
// 	longitude: 13.362460
// }

// const emser = {
// 	latitude: 52.469028,
// 	longitude: 13.435722
// }

// const dep = {
// 	type: 'departure',
// 	value: 1494918000000
// }

// route(ungarn, emser, dep)

module.exports = route
