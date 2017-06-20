'use strict'

const vbb = require('vbb-client')
const sortBy = require('lodash.sortby')

const formatResult = (res) => ({
	legs: res.parts.map((p) => ({
		departure: +p.start,
		origin: +p.end,
		duration: +p.end - +p.start,
		type: p.product ? p.product.type.type : p.type || 'walking'
	})),
	start: +res.start,
	end: +res.end,
	duration: +res.end - +res.start
})

const route = (origin, destination, time) =>
	vbb.routes(Object.assign(origin, {type: 'address'}), Object.assign(destination, {type: 'address'}), {when: time.value})
	.then((res) => sortBy(res, (o) => +o.end - +o.start)[0])
	.then(formatResult)

module.exports = route
