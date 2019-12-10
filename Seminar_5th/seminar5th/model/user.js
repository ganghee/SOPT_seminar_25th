const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');
let moment = require('moment'); 
const crypto = require('crypto');
const jwt = require('../modules/jwt');

const db = require('../modules/db/pool');
const userData = require('../modules/data/userData');

const THIS_LOG = '사용자 정보';

module.exports = {
    signUp: ({
        id,
        pw
    }) => {
        return new Promise(async(resolve,reject) => {
            if(!id || !pw){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const getUserQuery = "SELECT * FROM user WHERE userId = ?";
            const getUserResult = await db.queryParam_Parse(getUserQuery,[id]);
            if(getUserResult == undefined){
                resolve({
                    code: statusCode.DB_ERROR,
                    json: authUtil.successFalse(
                        responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )
                });
            }
            if(getUserResult[0]){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(
                        responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )
                });
            }
            const salt = crypto.randomBytes(32);
            const hashedPassword = crypto.pbkdf2Sync(pw, salt, 1, 32, 'sha512');
            const cryptedPassword = hashedPassword.toString('hex')
            let date = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss")
            const jwtToken = jwt.sign({id, date});
            const postUserQuery = "INSERT INTO user(userId, userPw, token, signupDate) VALUES(?, ?, ?, ?)";
            const postUserResult = await db.queryParam_Parse(postUserQuery,[id, cryptedPassword, jwtToken.token, date]);
            if(!postUserResult){
                resolve({
                    code: statusCode.UNAUTHORIZED,
                    json: authUtil.successFalse(
                        responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )
                });
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_CREATE_SUCCESS(THIS_LOG)
                )
            });
            }
        );
    },
    
}