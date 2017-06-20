'use strict'

const queryGoogleDirections = require('./google-directions')

const queryCarDirections = (origin, destination, departure, arrival) => {
	const query = {
		origin: origin.latitude + ',' + origin.longitude,
		destination: destination.latitude + ',' + destination.longitude,
		key: KEY
	}

	if (departure) query.departure_time = departure / 1000
	else if (arrival) query.arrival_time = arrival / 1000
	else throw new Error('you must pass departure or arrival.')

	return queryGoogleDirections(query)
	.then((res) => ({
		type: 'car',
		// todo: loop all legs
		distance: res.routes[0].legs[0].distance.value / 1000 + 4.5, // parking
		duration: res.routes[0].legs[0].duration_in_traffic.value * 1000 + 10 * 60 * 1000,
		// https://www.siemens.com/press/pool/de/feature/2015/mobility/2015-02-smart-parking/hintergrundpapier-schluss-mit-der-parkplatzsuche-d.pdf
		departure: departure ? time.value : time.value - (res.routes[0].legs[0].duration_in_traffic.value * 1000),
		arrival: !departure ? time.value : time.value + (res.routes[0].legs[0].duration_in_traffic.value * 1000)
	}))
}

module.exports = queryCarDirections
