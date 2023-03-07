const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
	const response = await fetch(`${API_URL}/planets`);
	return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
	const response = await fetch(`${API_URL}/launches`);
	const fetchedLaunches = await response.json();

	return fetchedLaunches.sort((a, b) => {
		return a.flightNumber - b.flightNumber;
	});
}

async function httpSubmitLaunch(launch) {
	try {
		return await fetch(`${API_URL}/launches`, {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(launch),
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
	// TODO: Once API is ready.
	// Submit given launch data to launch system.
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
	try {
		return await fetch(`${API_URL}/launches/${id}`, {
			method: 'DELETE',
		});
	} catch (error) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
