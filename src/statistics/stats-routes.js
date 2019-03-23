import express from 'express';
import { queryDateRange } from '../measurements/measurement-store';
import { computeStats } from './measurement-aggregator';
import { HttpError } from '../errors';
const router = express.Router();

export function register(app) {
  app.use('/stats', router);
}

router.get('/', (req, res) => {
  const metrics = asArray(req.query.metric);
  const stats = asArray(req.query.stat);

  const fromDateTime = new Date(req.query.fromDateTime);
  const toDateTime = new Date(req.query.toDateTime);
  if (fromDateTime > toDateTime) throw new HttpError(400);
  const measurements = queryDateRange(fromDateTime, toDateTime);
  res.json(computeStats(measurements, metrics, stats));
});

function asArray(val) {
  if (val == null) return null;

  return Array.isArray(val) ? val : [val];
}
