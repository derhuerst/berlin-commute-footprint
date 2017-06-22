'use strict'

const queryGoogleDirections = require('./google-directions')

const queryCarDirections = (o, d, departure, arrival) => {
	const query = {
		origin: o.coordinates.latitude + ',' + o.coordinates.longitude,
		destination: d.coordinates.latitude + ',' + d.coordinates.longitude
	}

	if (departure) query.departure_time = departure / 1000
	else if (arrival) query.arrival_time = arrival / 1000
	else throw new Error('you must pass departure or arrival.')

	return queryGoogleDirections(query)
	.then((res) => {
		const leg = res.routes[0].legs[0]
		return {
			type: 'car',
			legs: res.routes[0].legs,
			// todo: loop all legs
			distance: leg.distance.value / 1000 + 4.5, // parking
			// https://www.siemens.com/press/pool/de/feature/2015/mobility/2015-02-smart-parking/hintergrundpapier-schluss-mit-der-parkplatzsuche-d.pdf
			// duration: leg.duration_in_traffic.value * 1000 + 10 * 60 * 1000,
			duration: leg.duration.value * 1000 + 10 * 60 * 1000,
			// departure: departure ? departure : arrival - (leg.duration_in_traffic.value * 1000),
			// arrival: !departure ? arrival : departure + (leg.duration_in_traffic.value * 1000)
			departure: departure ? departure : arrival - (leg.duration.value * 1000),
			arrival: !departure ? arrival : departure + (leg.duration.value * 1000)
		}
	})
}

module.exports = queryCarDirections
