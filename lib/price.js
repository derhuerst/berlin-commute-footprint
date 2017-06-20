'use strict'

const clone = require('clone')

const calculate = (route) => {
	const r2 = clone(route)
	if(r2.legs[0].type==='bike') r2.price = r2.distance * 0.05
	else if(r2.legs[0].type==='car') r2.price = 7 * 1.4 * r2.distance / 100
	else r2.price = 18.5
	return r2
}

module.exports = calculate
