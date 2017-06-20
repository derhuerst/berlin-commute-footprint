'use strict'

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

const hour = 1000 * 60 * 60

const calculateCO2 = (route) => {
	let co2 = 0
	for (let leg of route.legs) {
		let amountPerKM = 0
		if (leg.distance) amountPerKM = leg.distance
		else amountPerKM += (avgSpeed[leg.type] || 0) * (leg.duration / hour)
		co2 += amountPerKM * (perKM[leg.type] || 0)
	}
	return co2
}

module.exports = calculateCO2
