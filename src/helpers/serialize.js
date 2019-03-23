export function serializeMeasurement(measurement) {
    const out = {
        timestamp: measurement.timestamp.toISOString()
    };

    for (const [metric, value] of measurement.metrics.entries()) {
        out[metric] = value;
    }

    return out;
}
