'use strict'

// todo: sources
const perHour = {
	walking: 150,
	bike: 600,
	car: 100
}

const hour = 1000 * 60 * 60

const calculateCalories = (route) => {
	let calories = 0
	for (let leg of route.legs) {
		calories += (leg.duration / hour) * (perHour[leg.type] || 0)
	}
	return calories
}

module.exports = calculateCalories
