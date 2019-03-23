import { body } from 'express-validator/check';

const TIMESTAMP_REQUIRED_MESSAGE = "Timestamp Required";
const DATETIME_MESSAGE = 'Must be DateTime';
const FLOAT_MESSAGE = 'Must be Float';

export default function validate(method) {
    switch (method) {
        case "main": {
            return [
                body("timestamp").exists().withMessage(TIMESTAMP_REQUIRED_MESSAGE).isISO8601().withMessage(DATETIME_MESSAGE),
                body("temperature").optional().isFloat().withMessage(FLOAT_MESSAGE),
                body("dewPoint").optional().isFloat().withMessage(FLOAT_MESSAGE),
                body("precipitation").optional().isFloat().withMessage(FLOAT_MESSAGE),
            ]
        }
    }
};
