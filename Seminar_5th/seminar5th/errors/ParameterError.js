const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class ParameterError extends Error {
    constructor(code = 'GENERIC', status = statusCode.BAD_REQUEST, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParameterError);
        }
        this.code = code;
        this.status = status;
        this.message = responseMessage.NULL_VALUE;
    }
}

module.exports = ParameterError;
