const db = require('../modules/db/pool');
const commentData = require('../modules/data/commentData');
const jwtExt = require('../modules/security/jwt-ext');
const { 
    AuthorizationError, 
    ParameterError,
    NotCreatedError,
    NotUpdatedError,
    NotDeletedError,
    NotFoundError,
} = require('../errors');
const COMMENT = '댓글';
const TABLE_NAME = 'comment';

const comment = {
    create: async (
        {title, 
        content}, 
        articleIdx, 
        token) => {
            if(!title || !content) throw new ParameterError
            const writer = jwtExt.verify(token).data.id
            const query = `INSERT INTO ${TABLE_NAME}(title, content, writer, articleIdx) VALUES (?, ?, ?, ?)`;
            const values = [title, content, writer, articleIdx];
            const result = await db.queryParam_Parse(query, values);
            if(result.affectedRows == 0) throw new NotCreatedError(COMMENT);
    },
    read: async (
        articleIdx, 
        commentIdx) => {
            const query = `SELECT * FROM ${TABLE_NAME} WHERE articleIdx = ? AND commentIdx = ?`;
            const values = [articleIdx, commentIdx];
            const result = await db.queryParam_Parse(query, values);
            console.log('result',result);
            if(result.length == 0) throw new NotFoundError(COMMENT);
            const comment = commentData(result[0]);
            return comment;
    },
    readAll: async (articleIdx) => {
            const query = `SELECT * FROM ${TABLE_NAME} WHERE articleIdx = ?`;
            const values = [articleIdx];
            const result = await db.queryParam_Parse(query, values);
            if(result.length == 0) throw new NotFoundError(COMMENT);
            const commentArr = [];
            result.forEach((rawComment) => 
                commentArr.push(commentData(rawComment)));
            return commentArr;
    },
    readAllComment: async() => {
            const query = `SELECT * FROM ${TABLE_NAME}`;
            const result = await db.queryParam_Parse(query);
            if(result.length == 0) throw new NotFoundError(COMMENT);
            const commentArr = [];
            result.forEach((rawComment) => 
                commentArr.push(commentData(rawComment)));
            return commentArr;
    },
    update: async(
        {commentIdx,
        title,
        content}, 
        articleIdx, 
        token) => {
            if(!title || !content || !commentIdx) throw new ParameterError
            const writer = jwtExt.verify(token).data.id
            const getQuery = `SELECT * FROM ${TABLE_NAME} WHERE articleIdx = ? AND commentIdx = ? AND writer = ?`;
            const getValues = [articleIdx, commentIdx, writer];
            const getResult = await db.queryParam_Parse(getQuery, getValues);
            if(getResult.length == 0) throw new AuthorizationError(COMMENT);
            const putQuery = `UPDATE ${TABLE_NAME} SET title = ?, content = ? WHERE articleIdx = ? AND commentIdx = ? AND writer = ?`;
            const putValues = [title, content, articleIdx, commentIdx, writer];
            const putResult = await db.queryParam_Parse(putQuery, putValues);
            if(putResult.affectedRows == 0) throw new NotUpdatedError(COMMENT);
    },
    delete: async(
        {commentIdx}, 
        articleIdx, 
        token) => {
        if(!commentIdx) throw new ParameterError
        const writer = jwtExt.verify(token).data.id;
        const getQuery = `SELECT * FROM ${TABLE_NAME} WHERE articleIdx = ? AND commentIdx = ? AND writer = ?`;
        const getValues = [articleIdx, commentIdx, writer];
        const getResult = await db.queryParam_Parse(getQuery, getValues);
        if(getResult.length == 0) throw new AuthorizationError(COMMENT);
        const deleteQuery = `DELETE FROM ${TABLE_NAME} WHERE articleIdx = ? AND commentIdx = ? AND writer = ?`;
        const deleteResult = await db.queryParam_Parse(deleteQuery,[articleIdx, commentIdx, writer]);
        if(deleteResult.affectedRows == 0) throw new NotDeletedError(COMMENT);
    }
}
module.exports = comment;