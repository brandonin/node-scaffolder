import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
const statSchema = {
  min: (metrics) => Math.min(...metrics),
  max: (metrics) => Math.max(...metrics),
  average: (metrics) => Math.round((metrics.reduce((acc, curr) => acc + curr) / metrics.length) * 100)/100,
}

export function computeStats(measurements, metrics, stats) {
  let res = [];
  metrics.forEach(metric => {
    const valuesOfMetric = measurements
            .filter(measurement => measurement.hasOwnProperty(metric))
            .map(measurement => measurement[metric]);
    if (valuesOfMetric.length > 0) stats.forEach(stat => res.push({metric, stat, value: statSchema[stat](valuesOfMetric)}));
  })
  return res;
}
