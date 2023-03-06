const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

fs.createReadStream(__dirname + '../data/kepler_data.csv') // stream => eventEmitter
	.pipe(
		// parsing data
		parse({
			comment: '#',
			columns: true,
		})
	)
	.on('data', (data) => {
		if (isHabitablePlanet(data)) {
			habitablePlanets.push(data);
		}
	})
	.on('error', (error) => console.log(error))
	.on('end', () => {
		console.log(`${habitablePlanets.length} habitable planets found!`);
		console.log('done');
	});

function isHabitablePlanet(planet) {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
}

module.exports = {
	planets: habitablePlanets,
};
