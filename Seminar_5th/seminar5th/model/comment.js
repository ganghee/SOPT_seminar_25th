const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');

const db = require('../modules/db/pool');
const commentData = require('../modules/data/commentData');

const THIS_LOG = '댓글';

const comment = {
    create: ({
        title,
        content,
        writer
    }, articleIdx) => {
        return new Promise(async(resolve,reject) => {
            if(!title || !content || !writer){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const postCommentQuery = 'INSERT INTO comment(title, content, writer, articleIdx) VALUES (?, ?, ?, ?)';
            const postCommentResult = await db.queryParam_Parse(postCommentQuery,[title, content, writer, articleIdx]);
            if(!postCommentResult){
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
            const getCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ? AND commentIdx = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery,[articleIdx, commentIdx]);
            if(getCommentResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_FAIL(THIS_LOG)
                )});
            }
            const comment = commentData(getCommentResult[0]);
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_READ_SUCCESS(THIS_LOG),
                    comment
            )});
        });
    },
    readAll: (articleIdx) => {
        return new Promise(async (resolve,reject) => {
            const getAllCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ?';
            const getAllCommentResult = await db.queryParam_Parse(getAllCommentQuery,[articleIdx]);
            if (!getAllCommentResult) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_ALL_FAIL(THIS_LOG)
                )});
            } 
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
        });
    },
    readAllComment: () => {
        return new Promise(async (resolve,reject) => {
            const getAllCommentQuery = 'SELECT * FROM comment';
            const getCommentsResult = await db.queryParam_Parse(getAllCommentQuery);
            if (!getCommentsResult) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_ALL_FAIL(THIS_LOG)
                )});
            } 
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
        });
    },
    update: ({
        commentIdx,
        title,
        content,
        writer
    }, articleIdx) => {
        return new Promise(async(resolve, reject) => {
            if(!title || !content || !writer){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            } 
            const getCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ? AND commentIdx = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery,[articleIdx, commentIdx]);
            console.log(getCommentResult);
            if (getCommentResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const putCommentQuery = 'UPDATE comment SET title = ?, content = ?, writer = ? WHERE articleIdx = ? AND commentIdx = ?';
            const putCommentResult = await db.queryParam_Parse(putCommentQuery,[title, content, writer, articleIdx, commentIdx])
            console.log(putCommentResult);
            if(!putCommentResult){
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
    remove: (body, articleIdx) => {
        return new Promise(async(resolve, reject) => {
            const getCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ? AND commentIdx = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery, [articleIdx, body.commentIdx]);
            if (getCommentResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const deleteCommentQuery = 'DELETE FROM comment WHERE articleIdx = ? AND commentIdx = ?';
            const deleteCommentResult = await db.queryParam_Parse(deleteCommentQuery,[articleIdx, body.commentIdx]);
            console.log(deleteCommentResult);
            if (!deleteCommentResult) {
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