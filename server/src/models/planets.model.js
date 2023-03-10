const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const Planet = require('./planets.mongo');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
}

function loadPlanetsData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(
			path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
		) // stream => eventEmitter
			.pipe(
				// parsing data
				parse({
					comment: '#',
					columns: true,
				})
			)
			.on('data', async (data) => {
				if (isHabitablePlanet(data)) {
					// TODO: Replace below create with insert + update = upsert
					await Planet.create({
						keplerName: data.kepler_name,
					});
					// const planet = new Planet({
					//	keplerName: data.kepler_name,
					//});
					// planet.save().then(() => console.log('meow'));
				}
			})
			.on('error', (error) => {
				console.log(error);
				reject(error);
			})
			.on('end', () => {
				console.log(`${habitablePlanets.length} habitable planets found!`);
				resolve();
			});
	});
}

function getAllPlanets() {
	return habitablePlanets;
}

module.exports = {
	loadPlanetsData,
	getAllPlanets,
};
