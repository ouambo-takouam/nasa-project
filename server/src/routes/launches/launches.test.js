const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
	test('It should respond with 200 success', async () => {
		await request(app)
			.get('/launches')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});

describe('Test POST /launch', () => {
	const completedLaunchData = {
		mission: 'USS Enterprise',
		rocket: 'NCC 45710',
		target: 'Kepler',
		launchDate: 'January 4, 2028',
	};

	const launchDataWithoutDate = {
		mission: 'USS Enterprise',
		rocket: 'NCC 45710',
		target: 'Kepler',
	};

	const launchDataWithInvalidDate = {
		mission: 'USS Enterprise',
		rocket: 'NCC 45710',
		target: 'Kepler',
		launchDate: 'zoot',
	};

	test('It should respond with 201 created', async () => {
		const response = await request(app)
			.post('/launches')
			.send(completedLaunchData)
			.expect('Content-Type', /json/)
			.expect(201);

		const requestDate = new Date(completedLaunchData.launchDate).valueOf();
		const responseDate = new Date(response.body.launchDate).valueOf();

		expect(responseDate).toBe(requestDate);
		expect(response.body).toMatchObject(launchDataWithoutDate);
	});

	test('It should catch missing required properties', async () => {
		const response = await request(app)
			.post('/launches')
			.send(launchDataWithoutDate)
			.expect('Content-Type', /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: 'Missing required launch property',
		});
	});

	test('It should catch invalid dates', async () => {
		const response = await request(app)
			.post('/launches')
			.send(launchDataWithInvalidDate)
			.expect('Content-Type', /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: 'Invalid launch Date',
		});
	});
});
