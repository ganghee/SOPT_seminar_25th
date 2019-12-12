const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');
const db = require('../modules/db/pool');
const commentData = require('../modules/data/commentData');
const jwtExt = require('../modules/security/jwt-ext');

const THIS_LOG = '댓글';

const comment = {
    create: ({
        title,
        content
    }, articleIdx, token) => {
        return new Promise(async(resolve,reject) => {
            if(!title || !content){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const writer = jwtExt.verify(token).data.id
            const postCommentQuery = 'INSERT INTO comment(title, content, writer, articleIdxx) VALUES (?, ?, ?, ?)';
            const postCommentResult = await db.queryParam_Parse(postCommentQuery,[title, content, writer, articleIdx]);
            if(typeof(postCommentResult) == 'undefined' || postCommentResult.affectedRows == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_CREATE_FAIL(THIS_LOG)
                )});
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_CREATE_SUCCESS(THIS_LOG)
            )});
            
        });
    },
    read: (articleIdx, commentIdx) => {
        return new Promise(async (resolve,reject) => {
            const getCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ? AND commentIdxx = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery,[articleIdx, commentIdx]);
            console.log('getCommentResult',getCommentResult);
            if(typeof(getCommentResult) == 'undefined' || getCommentResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_FAIL(THIS_LOG)
                )});
            } else {
                const comment = commentData(getCommentResult[0]);
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_SUCCESS(THIS_LOG),
                        comment
                )});
            }
        });
    },
    readAll: (articleIdx) => {
        return new Promise(async (resolve,reject) => {
            const getAllCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ?';
            const getAllCommentResult = await db.queryParam_Parse(getAllCommentQuery,[articleIdx]);
            if (typeof(getAllCommentResult) == 'undefined' || getAllCommentResult.affectedRows == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_ALL_FAIL(THIS_LOG)
                )});
            } else {
                const commentArr = [];
                getAllCommentResult.forEach((rawComment) => {
                    commentArr.push(commentData(rawComment));
                });
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_ALL_SUCCESS(THIS_LOG),
                        commentArr
                )});
            }
        });
    },
    readAllComment: () => {
        return new Promise(async (resolve,reject) => {
            const getAllCommentQuery = 'SELECT * FROM comment';
            const getCommentsResult = await db.queryParam_Parse(getAllCommentQuery);
            if (typeof(getCommentsResult) == 'undefined' || getCommentsResult.affectedRows == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_ALL_FAIL(THIS_LOG)
                )});
            } else {
                const commentArr = [];
                getCommentsResult.forEach((rawComment) => {
                    commentArr.push(commentData(rawComment));
                });
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_ALL_SUCCESS(THIS_LOG),
                        commentArr
                )});
            };
        })
    },
    update: ({
        commentIdx,
        title,
        content
    }, articleIdx, token) => {
        return new Promise(async(resolve, reject) => {
            if(!title || !content){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            } 
            const writer = jwtExt.verify(token).data.id
            const getCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ? AND commentIdx = ? AND writer = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery,[articleIdx, commentIdx, writer]);
            if (typeof(getCommentResult) == 'undefined' || getCommentResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const putCommentQuery = 'UPDATE comment SET title = ?, content = ? WHERE articleIdx = ? AND commentIdx = ? AND writer = ?';
            const putCommentResult = await db.queryParam_Parse(putCommentQuery,[title, content, articleIdx, commentIdx, writer])
            if(typeof(putCommentResult) == 'undefined' || putCommentResult.affectedRows == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_UPDATE_FAIL(THIS_LOG)
                    )
                });
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_UPDATE_SUCCESS(THIS_LOG)
            )});
            
        });
    },
    remove: ({commentIdx}, articleIdx, token) => {
        return new Promise(async(resolve, reject) => {
            const writer = jwtExt.verify(token).data.id;
            const getCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ? AND commentIdx = ? AND writer = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery, [articleIdx, commentIdx, writer]);
            if (typeof(getCommentResult) == 'undefined' || getCommentResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const deleteCommentQuery = 'DELETE FROM comment WHERE articleIdx = ? AND commentIdx = ? AND writer = ?';
            const deleteCommentResult = await db.queryParam_Parse(deleteCommentQuery,[articleIdx, commentIdx, writer]);
            if (typeof(getCommentResult) == 'undefined' || deleteCommentResult.affectedRows == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
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
        });
    }
}
module.exports = comment;