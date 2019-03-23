import { Measurement } from './measurement';
import { HttpError } from '../errors';
import { serializeMeasurement } from "../helpers/serialize";

let map = new Map();
/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
export function add(measurement) {
  map.set(`${measurement.timestamp}`, measurement);
}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch(timestamp) {
  return map.get(`${new Date(timestamp)}`);
}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(start, end) {
  return (Array.from(map)).filter(value =>
            new Date(value[0]) >= start &&
            new Date(value[0]) < end ?
                true : false)
          .map(value => serializeMeasurement(value[1]))
}
