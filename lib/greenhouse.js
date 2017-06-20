'use strict'

const sumBy = require('lodash.sumby')
const clone = require('clone')

// Sources:
// http://www.bvg.de/images/content/unternehmen/medien/Zahlenspiegel_2016.pdf
// http://www.umweltbundesamt.de/umwelttipps-fuer-den-alltag/mobilitaet/bus-bahn-fahren#textpart-3
// https://www.umweltbundesamt.de/sites/default/files/medien/publikation/long/4364.pdf Seite 34
// https://www.umweltbundesamt.de/sites/default/files/medien/378/publikationen/hgp_umweltkosten_0.pdf

const perKM = {
	walking: 0,
	bike: 0,
	car: 142,
	subway: 78,
	suburban: 78,
	tram: 78,
	regional: 78,
	bus: 75
}

const avgSpeed = {
	subway: 30.9,
	tram: 19,
	bus: 19.4,
	suburban: 39.9,
	regional: 60 // todo: ???
}

const calculateLeg = (leg) => {
	if(leg.distance) leg.greenhouse = leg.distance * (perKM[leg.type] || 0)
	else {
		leg.greenhouse = (avgSpeed[leg.type] || 0) * (leg.duration / (1000 * 60 * 60)) * (perKM[leg.type] || 0)
	}
}

const calculate = (route) => {
	const r2 = clone(route)
	r2.legs.map(calculateLeg)
	r2.greenhouse = sumBy(r2.legs, (o) => o.greenhouse)
	return r2
}

module.exports = calculate

