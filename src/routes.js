import express from 'express';
import { json as parseJsonBody, urlencoded } from 'body-parser';
import expressValidator from 'express-validator';

import { register as registerMeasurements } from './measurements/measurements-routes';
import { register as registerStats } from './statistics/stats-routes';

const server = express();

// all requests and responses are in JSON
server.use(urlencoded({extended: true}));
server.use(parseJsonBody());
server.use(expressValidator());

// dummy handler so you can tell if the server is running
// features/01-measurements/03-update-measurement.feature
// e.g. `curl localhost:8000`
server.get('/', (req, res) => res.send('Weather tracker is up and running!\n'));

registerMeasurements(server);
registerStats(server);

export default server;
