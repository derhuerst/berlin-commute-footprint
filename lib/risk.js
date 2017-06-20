'use strict'

const sumBy = require('lodash.sumby')
const clone = require('clone')

// https://www.adac.de/_mmm/pdf/statistik_7_1_unfallrisiko_42782.pdf

const perMilKM = {
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

const calculateLeg = (leg) => {
	if(leg.distance) leg.risk = leg.distance * ((perMilKM[leg.type] / 1000) || 0)
	else {
		leg.risk = (avgSpeed[leg.type] || 0) * (leg.duration / (1000 * 60 * 60)) * ((perMilKM[leg.type] / 1000) || 0)
	}
}

const calculate = (route) => {
	const r2 = clone(route)
	r2.legs.map(calculateLeg)
	r2.risk = sumBy(r2.legs, (o) => o.risk)
	return r2
}

module.exports = calculate
