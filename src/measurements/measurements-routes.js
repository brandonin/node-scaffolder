import express from 'express';
import * as store from './measurement-store';
import { Measurement } from './measurement';
import { HttpError, ValidationError } from '../errors';
import validate from './measurement.validate';
import { serializeMeasurement } from '../helpers/serialize'

const router = express.Router();
export function register(app) {
  app.use('/measurements', router);
}

router.post('/', validate('main'), (req, res) => {
  ValidationError(req, res);
  const measurement = parseMeasurement(req.body);
  store.add(measurement);
  res.location(`/measurements/${measurement.timestamp.toISOString()}`).sendStatus(201);
});

router.get('/:timestamp', (req, res) => {
  const result = store.fetch(req.params.timestamp);
  if (result) res.json(serializeMeasurement(result));
  else res.sendStatus(404);
});

function parseMeasurement({ timestamp, ...metrics }) {
  const measurement = new Measurement();
  measurement.timestamp = new Date(timestamp);

  if (isNaN(measurement.timestamp)) throw new HttpError(400);

  for (const metric in metrics) {
    if (!metrics.hasOwnProperty(metric)) continue;

    const value = metrics[metric];
    if (isNaN(value)) throw new HttpError(400);

    measurement.setMetric(metric, +value);
  }

  return measurement;
}
