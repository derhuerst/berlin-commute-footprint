'use strict'

const config = require('config')
const fetch = require('node-fetch')
const qs = require('querystring')
const clone = require('clone')

const buildLocationString = (location) => `${location.latitude},${location.longitude}`

const extractData = (time) => (res) => ({
	// todo: loop all legs
	distance: res.routes[0].legs[0].distance.value / 1000,
	duration: res.routes[0].legs[0].duration.value * 1000,
	departure: (time.type==='departure') ? time.value : time.value - (res.routes[0].legs[0].duration.value * 1000),
	arrival: (time.type==='arrival') ? time.value : time.value + (res.routes[0].legs[0].duration.value * 1000)
})

const transformResult = (res) => {
	res.legs = [Object.assign(clone(res), {type: 'bike'})]
	return res
}

const route = (origin, destination, time) =>
	Promise.resolve().then(() => {
		const params = {
			origin: buildLocationString(origin),
			destination: buildLocationString(destination),
			key: config.api.google,
			mode: 'bicycling'
		}
		if(time.type==='departure') params.departure_time = time.value/1000
		if(time.type==='arrival') params.arrival_time = time.value/1000
		return params
	}).then((params) => fetch(`https://maps.googleapis.com/maps/api/directions/json?${qs.stringify(params)}`))
	.then((res) => res.json())
	.then(extractData(time))
	.then(transformResult)

module.exports = route
