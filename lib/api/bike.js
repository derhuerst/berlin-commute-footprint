'use strict'

const queryGoogleDirections = require('./google-directions')

const queryBikeDirections = (o, d, departure, arrival) => {
	const query = {
		origin: o.coordinates.latitude + ',' + o.coordinates.longitude,
		destination: d.coordinates.latitude + ',' + d.coordinates.longitude,
		mode: 'bicycling'
	}

	if (departure) query.departure_time = departure / 1000
	else if (arrival) query.arrival_time = arrival / 1000
	else throw new Error('you must pass departure or arrival.')

	return queryGoogleDirections(query)
	.then((res) => ({
		type: 'bike',
		// todo: loop all legs
		distance: res.routes[0].legs[0].distance.value / 1000,
		duration: res.routes[0].legs[0].duration.value * 1000,
		legs: res.routes[0].legs,
		departure: departure ? departure : arrival - (res.routes[0].legs[0].duration.value * 1000),
		arrival: !departure ? arrival : departure + (res.routes[0].legs[0].duration.value * 1000)
	}))
}

module.exports = queryBikeDirections
