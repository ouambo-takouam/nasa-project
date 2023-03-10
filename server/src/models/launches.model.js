const Launch = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 27, 2030'),
	target: 'Kepler-442 b',
	customers: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
	return launches.has(launchId);
}

async function getAllLaunches() {
	return await Launch.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
	try {
		await Launch.updateOne({ flightNumber: launch.flightNumber }, launch, {
			upsert: true,
		});
	} catch (error) {
		console.error(`Could not save launch ${error}`);
	}
}

async function addNewLaunch(launch) {
	latestFlightNumber++;

	launches.set(latestFlightNumber, {
		flightNumber: latestFlightNumber,
		customers: ['Zero To Mastery', 'NASA'],
		upcoming: true,
		success: true,
		...launch,
	});
}

function abortLaunchById(launchId) {
	const aborted = launches.get(launchId);
	aborted.upcoming = false;
	aborted.success = false;

	return aborted;
}

module.exports = {
	existsLaunchWithId,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
};
