const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class DatabaseError extends Error {
    constructor(code = 'GENERIC', status = statusCode.DB_ERROR, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }
        this.code = code;
        this.status = status;
        this.message = responseMessage.DB_ERROR;
    }
}

module.exports = DatabaseError;
