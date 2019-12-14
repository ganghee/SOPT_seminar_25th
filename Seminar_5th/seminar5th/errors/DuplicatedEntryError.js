const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class DuplicatedEntryError extends Error {
    constructor(code = 'GENERIC', status = statusCode.BAD_REQUEST, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DuplicatedEntryError);
        }
        this.code = code;
        this.status = status;
        this.message = responseMessage.DB_DUPLICATE_ENTRY_ERROR;
    }
}

module.exports = DuplicatedEntryError;
