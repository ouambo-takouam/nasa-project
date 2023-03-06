const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');

const logger = morgan('combined');

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(logger);
app.use(express.json());
app.use(planetsRouter);

module.exports = app;
