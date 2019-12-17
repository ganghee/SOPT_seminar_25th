let moment = require('moment');
const jwtExt = require('../modules/security/jwt-ext');
const encryptionManager = require('../modules/security/encryptionManager');
const db = require('../modules/db/pool');
const { 
    ParameterError,
    DatabaseError,
    MissPasswordError,
    NotCreatedError,
    NotFoundError,
    NotUpdatedError,
    ExistedUserError,
    NotDeletedError } = require('../errors');
const TABLE = 'user';
const NAME = "사용자";

module.exports = {
    signUp: async({
        id,
        pw
    }) => {
        if(!id || !pw) throw new ParameterError;
        const getQuery = `SELECT * FROM ${TABLE} WHERE userId = ?`;
        const getValues = [id];
        const getResult = await db.queryParam_Parse(getQuery, getValues);
        if(typeof(getResult) == 'undefined'){
            throw new DatabaseError;
        } else if(getResult.length > 0){
            throw new ExistedUserError;
        }
        const salt = await encryptionManager.makeRandomByte();
        const hashedPassword =  encryptionManager.encryption(pw,salt);
        let date = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss");
        const postQuery = "INSERT INTO user(userId, userPw, signupDate, salt) VALUES(?, ?, ?, ?)";
        const postValues = [id, hashedPassword, date, salt];
        const postResult = await db.queryParam_Parse(postQuery, postValues);
        if(typeof(postResult) == 'undefined'){
            throw new DatabaseError;
        } else if(postResult.affectedRows == 0){
            throw new NotCreatedError(name = NAME);
        }
    },
    signIn: async ({
        id,
        pw
    }) => {
        if(!id || !pw) throw new ParameterError
        const getQuery = "SELECT * FROM user WHERE userId = ?";
        const getValues = [id];
        const getResult = await db.queryParam_Parse(getQuery, getValues);
        if(typeof(getResult) == 'undefined'){
            throw new DatabaseError;
        } else if(getResult.length == 0){
            throw new NotFoundError(name = NAME);
        } 
        const salt = getResult[0].salt;
        const hashedPassword = await encryptionManager.encryption(pw, salt);
        if(getResult[0].userPw != hashedPassword) throw new MissPasswordError;
        let date = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss");
        const jwtToken = jwtExt.publish({id,date});
        return {token :jwtToken.token}
    },
    update: async(
        {pw},
        token
    ) => {
        if(!pw) throw new ParameterError;
        let date = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss");
        const id = jwtExt.verify(token).data.id;
        const jwtToken = jwtExt.publish({id,date}).token;
        const salt = await encryptionManager.makeRandomByte();
        const hashedPassword = await encryptionManager.encryption(pw,salt);
        const putQuery = "UPDATE user SET userPw = ?, salt = ? WHERE userId = ?";
        const putValues = [hashedPassword, salt, id];
        const putResult = await db.queryParam_Parse(putQuery, putValues);
        if(typeof(putResult) == 'undefined'){
            throw new DatabaseError;
        } else if(putResult.affectedRows == 0){
            throw new NotUpdatedError(name = NAME);
        }
        return {token: jwtToken}
    },
    remove: async(token) => {
        const id = jwtExt.verify(token).data.id;
        const deleteQuery = "DELETE FROM user WHERE userId = ?";
        const deleteValues = [id];
        const deleteResult = await db.queryParam_Parse(deleteQuery, deleteValues);
        if(typeof(deleteResult) == 'undefined'){
            throw new DatabaseError;
        } else if(deleteResult.affectedRows == 0){
            throw new NotDeletedError(name = NAME);
        }
    }
}
