const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');
let moment = require('moment');
const jwtExt = require('../modules/security/jwt-ext');
const encryptionManager = require('../modules/security/encryptionManager');
const db = require('../modules/db/pool');

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
            //유저가 있으면 생성 X
            const getUserQuery = "SELECT * FROM user WHERE userId = ?";
            const getUserResult = await db.queryParam_Parse(getUserQuery,[id]);
            if(typeof(getUserResult) == 'undefined' || getUserResult.affectedRows == 0){
                resolve({
                    code: statusCode.DB_ERROR,
                    json: authUtil.successFalse(
                        responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )
                });
            }
            const salt = await encryptionManager.makeRandomByte();
            const hashedPassword = await encryptionManager.encryption(pw,salt);
            let date = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss")
            const postUserQuery = "INSERT INTO user(userId, userPw, signupDate, salt) VALUES(?, ?, ?, ?)";
            const postUserResult = await db.queryParam_Parse(postUserQuery,[id, hashedPassword, date, salt]);
            if(typeof(postUserResult) == 'undefined' || postUserResult.affectedRows == 0){
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
            if(typeof(getUserResult) == 'undefined' ||getUserResult.affectedRows == 0){
                resolve({
                    code: statusCode.DB_ERROR,
                    json: authUtil.successFalse(
                        responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )
                });
            } else {
                console.log('getUserResult[0]',getUserResult[0].salt);
                const salt = getUserResult[0].salt;
                const hashedPassword = await encryptionManager.encryption(pw, salt)
                console.log('hashedPassword',hashedPassword,"pw    ",pw)
                if(getUserResult[0].userPw != hashedPassword){
                    resolve({
                        code: statusCode.BAD_REQUEST,
                        json: authUtil.successFalse(
                            responseMessage.MISS_MATCH_PW
                        )
                    });
                }
                let date = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss")
                const jwtToken = jwtExt.publish({id,date})
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.LOGIN_SUCCESS,
                        {token :jwtToken.token}
                    )
                })
            }
        });
    
    },
    update: ({
        pw
    },token) => {
        return new Promise(async(resolve, reject) => {
            if(!pw){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            let date = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss")
            const id = jwtExt.verify(token).data.id
            const jwtToken = jwtExt.publish({id,date}).token
            const salt = await encryptionManager.makeRandomByte();
            const hashedPassword = await encryptionManager.encryption(pw,salt);
            const putUserQuery = "UPDATE user SET userPw = ?, salt = ? WHERE userId = ?";
            const putUserResult = await db.queryParam_Parse(putUserQuery,[hashedPassword, salt, id]);
            if(typeof(putUserResult) == 'undefined' || putUserResult.affectedRows == 0){
                resolve({
                    code: statusCode.DB_ERROR,
                    json: authUtil.successFalse(
                        responseMessage.X_UPDATE_FAIL(THIS_LOG)
                    )
                });
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_UPDATE_SUCCESS(THIS_LOG),
                    {token: jwtToken}
                )
            });
        })
    },
    remove: (token) => {
        return new Promise(async(resolve, reject) => {
            const id = jwtExt.verify(token).data.id
            const deleteUserQuery = "DELETE FROM user WHERE userId = ?";
            const deleteUserResult = await db.queryParam_Parse(deleteUserQuery,[id]);
            if(typeof(deleteUserResult) == 'undefined' || deleteUserResult.affectedRows == 0){
                resolve({
                    code: statusCode.DB_ERROR,
                    json: authUtil.successFalse(
                        responseMessage.X_DELETE_FAIL(THIS_LOG)
                    )
                });
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_DELETE_SUCCESS(THIS_LOG)
                )
            });
        })
    }
}
