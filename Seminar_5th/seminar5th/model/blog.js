const db = require('../modules/db/pool');
const blogData = require('../modules/data/blogData');
const jwtExt = require('../modules/security/jwt-ext');
const {
    ParameterError,
    NotUpdatedError, 
    NotCreatedError,
    NotDeletedError,
    NotFoundError,
    AuthorizationError} = require('../errors');
const TABLE_NAME = "blog"
let CATEGORY = "카테고리";

const blog = {
    create: async ({
        title,
        content
    }, token) => {
        if(!title || !content) throw new ParameterError;
        const writer = jwtExt.verify(token).data.id;
        const query = `INSERT INTO ${TABLE_NAME}(title, content, writer) VALUES (?, ?, ?)`;
        const values = [title, content, writer];
        const result = await db.queryParam_Parse(query, values);
        if(result.affectedRows == 0) throw new NotCreatedError(CATEGORY);
    },
    read: async(blogIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE blogIdxㄷ = ?`;
        const values = [blogIdx];
        const result = await db.queryParam_Parse(query, values);
        if(result.length == 0) throw new NotFoundError(CATEGORY);
        const blog = blogData(result[0]);
        return blog;
        
    },
    readAll: async() => {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        const result = await db.queryParam_None(query);
        if(result.length == 0) throw new NotFoundError(CATEGORY);
        const blogArr = [];
        result.forEach((rawBlog, index, result) => 
            blogArr.push(blogData(rawBlog)));
        return blogArr;
    },
    update: async ({
        blogIdx,
        title,
        content
    }, token) => {
        if(!blogIdx || !title || !content) throw new ParameterError;
        const writer = jwtExt.verify(token).data.id;
        const getQuery = `SELECT * FROM ${TABLE_NAME} WHERE blogIdx = ? AND writer = ?`;
        const getValues = [blogIdx, writer];
        const getResult = await db.queryParam_Parse(getQuery, getValues);
        if(getResult.length == 0) throw new AuthorizationError(CATEGORY);
        const putQuery = `UPDATE ${TABLE_NAME} SET title = ?, content = ?, writer = ? WHERE blogIdx = ?`;
        const putValues = [title, content, writer, blogIdx];
        const putResult = await db.queryParam_Parse(putQuery, putValues);
        if(putResult.affectedRows == 0) throw new NotUpdatedError(CATEGORY);
    },
    delete: async (
        {blogIdx}
        , token) => {
        const writer = jwtExt.verify(token).data.id;
        const getQuery = `SELECT * FROM ${TABLE_NAME} WHERE blogIdx = ? AND writer = ?`;
        const getValues = [blogIdx, writer];
        const getResult = await db.queryParam_Parse(getQuery, getValues);
        if(getResult.length == 0) throw new AuthorizationError(CATEGORY);
        const deleteQuery = `DELETE FROM ${TABLE_NAME} WHERE blogIdx = ? AND writer = ?`;
        const deleteValues = [blogIdx, writer];
        const deleteResult = await db.queryParam_Parse(deleteQuery, deleteValues);
        if(deleteResult.affectedRows == 0) throw new NotDeletedError(CATEGORY);
    }
}
module.exports = blog;