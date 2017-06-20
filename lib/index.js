'use strict'

const greenhouse = require('./greenhouse')
const calories = require('./calories')
const price = require('./price')
const risk = require('./risk')
const clone = require('clone')

const pt = require('./api/public-transport')
const car = require('./api/car')
const bike = require('./api/bike')


// const ungarn = {
// 	latitude: 52.557758,
// 	longitude: 13.362460
// }

// const emser = {
// 	latitude: 52.469028,
// 	longitude: 13.435722
// }

// const waldammer = {
// 	latitude: 52.590603,
// 	longitude: 13.449204
// }

// const kolonnen = {
// 	latitude: 52.484981,
// 	longitude: 13.366821
// }

// const dep = {
// 	type: 'departure',
// 	value: 1494918000000
// }

// pt(ungarn, kolonnen, dep)//(waldammer, kolonnen, dep)//(ungarn, emser, dep)
// .then(greenhouse)
// .then(calories)
// .then(console.log)
// .catch(console.error)

// car(ungarn, kolonnen, dep)//(waldammer, kolonnen, dep)//(ungarn, emser, dep)
// .then(greenhouse)
// .then(calories)
// .then(console.log)
// .catch(console.error)

// bike(ungarn, kolonnen, dep)//(waldammer, kolonnen, dep)//(ungarn, emser, dep)
// .then(greenhouse)
// .then(calories)
// .then(console.log)
// .catch(console.error)


const count = (results) => {
	const counted = {
		calories: 0,
		greenhouse: 0,
		duration: 0,
		price: 0,
		risk: 0
	}
	for(let result of results){
		for(let key in counted){
			counted[key] += result[key]
		}
	}
	if(['car', 'bike'].indexOf(results[0].legs[0].type)<0) counted.price = 961/48//9.5//18.5
	return counted
}

const check = (routes) => {
	const requests = {
		pt: [],
		car: [],
		bike: []
	}

	for(let route of routes){
		route.time.type = 'departure'
		requests.pt.push(pt(route.origin, route.destination, route.time).then(greenhouse).then(calories).then(price).then(risk))
		requests.car.push(car(route.origin, route.destination, route.time).then(greenhouse).then(calories).then(price).then(risk))
		requests.bike.push(bike(route.origin, route.destination, route.time).then(greenhouse).then(calories).then(price).then(risk))
	}

	return Promise.all([Promise.all(requests.pt), Promise.all(requests.car), Promise.all(requests.bike)])
	.then(([ptResults, carResults, bikeResults]) => ({
		pt: count(ptResults),
		car: count(carResults),
		bike: count(bikeResults)
	}))
}

module.exports = check

// check([
// 	{origin: ungarn, destination: kolonnen, time: dep},
// 	{origin: ungarn, destination: kolonnen, time: dep},
// 	{origin: ungarn, destination: kolonnen, time: dep},
// 	{origin: ungarn, destination: kolonnen, time: dep},
// 	{origin: ungarn, destination: kolonnen, time: dep},
// 	{origin: ungarn, destination: kolonnen, time: dep},
// 	{origin: waldammer, destination: emser, time: dep},
// 	{origin: kolonnen, destination: emser, time: dep},
// 	{origin: waldammer, destination: ungarn, time: dep}
// ])
// .then(console.log)
// .catch(console.error)
