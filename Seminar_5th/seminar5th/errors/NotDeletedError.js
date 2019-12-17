const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class NotDeletedError extends Error {
    constructor(name, code = 'GENERIC', status = statusCode.DB_ERROR, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotDeletedError);
        }
        this.name = name;
        this.code = code;
        this.status = status;
        this.message = responseMessage.NOT_DELETE_INFO(name);
    }
}

module.exports = NotDeletedError;