'use strict'

const calculateCO2 = require('./lib/co2')
const calculateCalories = require('./lib/calories')
const calculatePrice = require('./lib/price')
const calculateRisk = require('./lib/risk')

const publicTransport = require('./lib/api/public-transport')
const car = require('./lib/api/car')
const bike = require('./lib/api/bike')

const isValidLocation = (location) => {
	return location
	&& 'object' === typeof location
	&& location.coordinates
	&& 'number' === typeof location.coordinates.latitude
	&& 'number' === typeof location.coordinates.longitude
}

const isValidTime = (time) => time >= Date.now()

const compute = (journey) => {
	// if (!Array.isArray(journeys)) throw new Error('journeys must be an array.')
	// if (!journeys.length === 0) throw new Error('must be one or more journey.')
	// for (let i = 0; i < journeys.length; i++) {
	if (!journey) throw new Error(`journey is not an object.`)

	if (!isValidLocation(journey.origin)) {
		throw new Error(`journey origin is invalid.`)
	}
	if (!isValidLocation(journey.destination)) {
		throw new Error(`journey destination is invalid.`)
	}

	if (!journey.arrival && !journey.departure) {
		throw new Error(`journey must have arrival or departure.`)
	}
	if (journey.arrival && !isValidTime(journey.arrival)) {
		throw new Error(`journey arrival is invalid.`)
	}
	if (journey.departure && !isValidTime(journey.departure)) {
		throw new Error(`journey departure is invalid.`)
	}

	const {origin, destination, departure, arrival} = journey

	const calculate = (data) => ({
		co2: calculateCO2(data),
		calories: calculateCalories(data),
		price: calculatePrice(data),
		risk: calculateRisk(data)
	})

	return Promise.all([
		publicTransport(origin, destination, departure, arrival).then(calculate),
		bike(origin, destination, departure, arrival).then(calculate),
		car(origin, destination, departure, arrival).then(calculate)
	])
	.then(([publicTransport, bike, car]) => {
		return {publicTransport, bike, car}
	})
}

module.exports = compute
