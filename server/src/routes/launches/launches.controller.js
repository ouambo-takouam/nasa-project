const {
	existsLaunchWithId,
	getAllLaunches,
	addNewLaunch,
	abortLaunch,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
	const launch = req.body;
	const { launchDate, mission, rocket, target } = launch;

	if (!launchDate || !mission || !rocket || !target) {
		return res.status(400).json({
			error: 'Missing required launch property',
		});
	}

	launch.launchDate = new Date(launch.launchDate);

	// or isNaN(launchDate)
	if (launch.launchDate.toString() === 'Invalid Date') {
		return res.status(400).json({
			error: 'Invalid launch Date',
		});
	}

	addNewLaunch(launch);

	return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
	const { launchId } = req.params;

	// if launch doesn't exist
	if (!existsLaunchWithId(launchId)) {
		return res.status(404).json({
			error: 'Launch not found',
		});
	}

	// if launch does exist
	// return res.status(200).json(aborted);
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbortLaunch,
};
