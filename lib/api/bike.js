'use strict'

const queryGoogleDirections = require('./google-directions')

const queryBikeDirections = (origin, destination, departure, arrival) => {
	const query = {
		origin: origin.latitude + ',' + origin.longitude,
		destination: destination.latitude + ',' + destination.longitude,
		key: KEY,
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
		departure: departure ? time.value : time.value - (res.routes[0].legs[0].duration.value * 1000),
		arrival: !departure ? time.value : time.value + (res.routes[0].legs[0].duration.value * 1000)
	}))
}

module.exports = queryBikeDirections
