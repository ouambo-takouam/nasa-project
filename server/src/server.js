const http = require('http');
const app = require('./app'); // listener
const mongoose = require('mongoose');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

// const MONGO_URL =
// 	'mongodb+srv://nasa-api:c9TYlfMXehEHGOnH@nasacluster.tjzx2xz.mongodb.net/nasa?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
	console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
	console.error(error);
});

async function startServer() {
	// await mongoose.connect(MONGO_URL);
	await loadPlanetsData();

	server.listen(PORT, () => {
		console.log(`listening on port ${PORT}`);
	});
}

startServer();
