'use strict'

// todo: sources
// todo: what about the other legs?
const calculatePrice = (route) => {
	if (route.legs[0].type === 'bike') return route.distance * 0.05
	if (route.legs[0].type === 'car') return 7 * 1.4 * route.distance / 100
	// https://github.com/juliuste/umsteigen.jetzt-rest/commit/c2aa8b22b9f963505a5d53a8977bbb79cf591e8a#commitcomment-22642356
	return 961 / 48 // 961€, 48 work weeks
	return 18.5
}

module.exports = calculatePrice
