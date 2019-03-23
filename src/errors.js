import { STATUS_CODES } from 'http';
import { validationResult } from 'express-validator/check';

export class HttpError extends Error {
  constructor(status) {
    super(STATUS_CODES[status]);
    this.status = status;
  }
}

export function ValidationError(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
}
