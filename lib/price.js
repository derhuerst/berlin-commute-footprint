'use strict'

// todo: sources
// todo: what about the other legs?
const calculatePrice = (route) => {
	if (route.legs[0].type === 'bike') return route.distance * 0.05
	if (route.legs[0].type === 'car') return 7 * 1.4 * route.distance / 100
	return 18.5
}

module.exports = calculatePrice
