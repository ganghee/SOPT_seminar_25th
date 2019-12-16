const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class MissPasswordError extends Error {
    constructor(code = 'GENERIC', status = statusCode.FORBIDDEN, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MissPasswordError);
        }
        this.code = code;
        this.status = status;
        this.message = responseMessage.MISS_MATCH_PW;
    }
}

module.exports = MissPasswordError;