const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');
let moment = require('moment');
const crypto = require('crypto');
const jwt = require('../modules/security/jwt');
const encryptionManager = require('../modules/security/encryptionManager')

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
            const salt = await encryptionManager.makeRandomByte();
            const hashedPassword = await encryptionManager.encryption(pw,salt);
            let date = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss")
            const jwtToken = jwt.sign({id, date});
            const postUserQuery = "INSERT INTO user(userId, userPw, token, signupDate, salt) VALUES(?, ?, ?, ?, ?)";
            const postUserResult = await db.queryParam_Parse(postUserQuery,[id, hashedPassword, jwtToken.token, date, salt]);
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
    signIn:({
        id,
        pw
    }) => {
        return new Promise(async(resolve, reject) => {
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
            const salt = getUserResult[0].salt;
            const hashedPassword = await encryptionManager.encryption(pw, salt)
            if(getUserResult[0].userPw != hashedPassword){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(
                        responseMessage.MISS_MATCH_PW
                    )
                });
            }
            const userInfo = userData(getUserResult[0])
            const token = {token : userInfo.token};
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.LOGIN_SUCCESS,
                    token
                )
            })
        });
    },
}
