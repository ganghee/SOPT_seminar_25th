const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class NotFoundError extends Error {
    constructor(name, code = 'GENERIC', status = statusCode.BAD_REQUEST, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }
        this.name = name;
        this.code = code;
        this.status = status;
        this.message = responseMessage.NOT_FOUND(name);
    }
}

module.exports = NotFoundError;
