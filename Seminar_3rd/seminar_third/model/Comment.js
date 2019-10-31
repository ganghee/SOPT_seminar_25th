const statusCode = require('../module/utils/statusCode');
const responseMessage = require('../module/utils/responseMessage');
const authUtil = require('../module/utils/authUtil');

const db = require('../module/db/pool');
const commentData = require('../module/data/commentData');

const THIS_LOG = '댓글';

const comment = {
    create: (body, articleIdx) => {
        return new Promise(async(resolve,reject) => {
            const {
                title,
                content,
                writer
            } = body;
    
            if(!title || !content || !writer){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            } else{
                const postCommentQuery = 'INSERT INTO comment(title, content, writer, articleIdx) VALUES (?, ?, ?, ?)';
                const postCommentResult = await db.queryParam_Parse(postCommentQuery,[title, content, writer, articleIdx]);
                if(!postCommentResult){
                    resolve({
                        code: statusCode.NOT_FOUND,
                        json: authUtil.successFalse(
                            responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )});
                }else{
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(
                            responseMessage.X_CREATE_SUCCESS(THIS_LOG)
                    )});
                }
            }
        });
    },
    read: (blogIdx, articleIdx, commentIdx) => {
        return new Promise(async (resolve,reject) => {
            const getCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ? AND commentIdx = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery,[articleIdx, commentIdx]);

            if(getCommentResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_FAIL(THIS_LOG)
                )});
            } else{
                let comment = commentData(getCommentResult[0]);
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
            if (!getAllCommentResult) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_ALL_FAIL(THIS_LOG)
                )});
            } else {
                let commentArr = [];
                getAllCommentResult.forEach((rawComment, index, result) => {
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
    update: (body, articleIdx) => {
        return new Promise(async(resolve,reject) => {
            const {
                commentIdx,
                title,
                content,
                writer
            } = body;

            if(!title || !content || !writer){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            } else{
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
                }else{
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
                    }else{
                        resolve({
                            code: statusCode.OK,
                            json: authUtil.successTrue(
                                responseMessage.X_UPDATE_SUCCESS(THIS_LOG)
                        )});
                    }
                }
            }
        });
    },
    remove: (body, articleIdx) => {
        return new Promise(async(resolve,reject) => {
            const getCommentQuery = 'SELECT * FROM comment WHERE articleIdx = ? AND commentIdx = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery, [articleIdx, body.commentIdx] );

            if (getCommentResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            } else {
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
                } else { 
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(
                            responseMessage.X_DELETE_SUCCESS(THIS_LOG)
                        )
                    });
                }
            }
        });
    }
}
module.exports = comment;