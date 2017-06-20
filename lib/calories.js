'use strict'

const sumBy = require('lodash.sumby')
const clone = require('clone')


const perH = {
	walking: 150,
	bike: 600,
	car: 100
}

const calculateLeg = (leg) => {
	leg.calories = (leg.duration / (1000 * 60 * 60)) * (perH[leg.type] || 0)
}

const calculate = (route) => {
	const r2 = clone(route)
	r2.legs.map(calculateLeg)
	r2.calories = sumBy(r2.legs, (o) => o.calories)
	return r2
}

module.exports = calculate
