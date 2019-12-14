const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class NotMatchedError extends Error {
    constructor(code = 'GENERIC', status = statusCode.DB_ERROR, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotMatchedError);
        }
        this.code = code;
        this.status = status;
        this.message = responseMessage.DB_NOT_MATCHED_ERROR;
    }
}

module.exports = NotMatchedError;
