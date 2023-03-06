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
	fetch(`${API_URL}/launches`, {
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(launch),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	// TODO: Once API is ready.
	// Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
	// TODO: Once API is ready.
	// Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
