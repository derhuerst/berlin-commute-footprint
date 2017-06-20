'use strict'

// https://www.adac.de/_mmm/pdf/statistik_7_1_unfallrisiko_42782.pdf

const perMillionKM = {
	walking: 0.92,
	bike: 2.13,
	car: 0.25,
	subway: 0.15,
	suburban: 0.15,
	tram: 0.15,
	regional: 0.15,
	bus: 0.15
}

const avgSpeed = {
	walking: 5.5,
	subway: 30.9,
	tram: 19,
	bus: 19.4,
	suburban: 39.9,
	regional: 60 // todo: ???
}

const hour = 1000 * 60 * 60

const calculateRisk = (route) => {
	let risk = 0
	for (let leg of route.legs) {
		let x = 0
		if (leg.distance) x = leg.distance
		else x = (avgSpeed[leg.type] || 0) * (leg.duration / hour)
		risk += x * (perMillionKM[leg.type] || 0) / 1000
	}
	return risk
}

module.exports = calculateRisk
