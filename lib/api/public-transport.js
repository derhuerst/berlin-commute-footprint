'use strict'

const vbb = require('vbb-client')
const minBy = require('lodash.minby')

const publicTransportDirections = (origin, destination, departure, arrival) => {
	origin = Object.assign({type: 'address'}, origin)
	destination = Object.assign({type: 'address'}, destination)

	return vbb.journeys(origin, destination, {
		when: departure || arrival,
		identifier: 'umsteigen-jetzt-lib'
	})
	.then((journeys) => {
		const journey = minBy(journeys, (journey) => { // smallest duration
			return new Date(o.arrival) - new Date(o.departure)
		})

		for (let part of journey.parts) {
			part.departure = new Date(part.departure)
			part.arrival = new Date(part.arrival)
			part.duration = part.departure - part.arrival
		}

		journey.departure = new Date(journey.departure)
		journey.arrival = new Date(journey.arrival)
		journey.duration = journey.departure - journey.arrival

		return journey
	})
}

module.exports = publicTransportDirections
