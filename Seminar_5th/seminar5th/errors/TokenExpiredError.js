const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class TokenExpiredError extends Error {
    constructor(code = 'GENERIC', status = statusCode.UNAUTHORIZED, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TokenExpiredError);
        }
        this.code = code;
        this.status = status;
        this.message = responseMessage.UNAUTHORIZED;
    }
}

module.exports = TokenExpiredError;
