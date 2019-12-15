const db = require('../modules/db/pool')
const blogData = require('../modules/data/blogData')
const jwtExt = require('../modules/security/jwt-ext');
const { NotMatchedError, ParameterError, DatabaseError } = require('../errors');

const blog = {
    create: async (
        {title,content},
        token) => {
            if(!title || !content) throw new ParameterError
            const writer = jwtExt.verify(token).data.id
            const postQuery = 'INSERT INTO blog(title, content, writer) VALUES (?, ?, ?)';
            const postValues = [title, content, writer];
            const postResult = await db.queryParam_Parse(postQuery, postValues);
            if(typeof(postResult) == 'undefined'){
                throw new DatabaseError;
            } else if(postResult.affectedRows == 0){
                throw new NotMatchedError
            }
    },
    read: async(blogIdx) => {
        const getQuery = 'SELECT * FROM blog WHERE blogIdx = ?';
        const getValues = [blogIdx];
        const getResult = await db.queryParam_Parse(getQuery, getValues);
        if(typeof(getResult) == 'undefined'){
            throw new DatabaseError;
        } else if(getResult.affectedRows == 0){
            throw new NotMatchedError
        } else {
            const blog = blogData(getResult[0]);
            return blog;
        }
    },
    readAll: async() => {
        const getAllQuery = 'SELECT * FROM blog';
        const getAllResult = await db.queryParam_None(getAllQuery);
        if(typeof(getAllResult) == 'undefined'){
            throw new DatabaseError;
        } else if(getAllResult.affectedRows == 0){
            throw new NotMatchedError
        } else {
            const blogArr = [];
            getAllResult.forEach((rawBlog, index, result) => {
                blogArr.push(blogData(rawBlog));
            });
            return blogArr;
        }
    },
    update: async ({
        blogIdx,
        title,
        content
    }, token) => {
        if(!blogIdx || !title || !content) throw new ParameterError
        const writer = jwtExt.verify(token).data.id;
        const getQuery = 'SELECT * FROM blog WHERE blogIdx = ? AND writer = ?';
        const getValues = [blogIdx, writer];
        const getResult = await db.queryParam_Parse(getQuery, getValues);
        if(typeof(getResult) == 'undefined'){
            throw new DatabaseError;
        } else if(getResult.affectedRows == 0){
            throw new NotMatchedError
        }
        const putQuery = 'UPDATE blog SET title = ?, content = ?, writer = ? WHERE blogIdx = ?';
        const putValues = [title, content, writer, blogIdx];
        const putResult = await db.queryParam_Parse(putQuery, putValues)
        if(typeof(putResult) == 'undefined'){
            throw new DatabaseError;
        } else if(putResult.affectedRows == 0){
            throw new NotMatchedError
        }
    },
    remove: async ({blogIdx}, token) => {
        const writer = jwtExt.verify(token).data.id
        const getQuery = 'SELECT * FROM blog WHERE blogIdx = ? AND writer = ?';
        const getValues = [blogIdx, writer];
        const getResult = await db.queryParam_Parse(getQuery, getValues);
        if(typeof(getResult) == 'undefined'){
            throw new DatabaseError;
        } else if(getResult.affectedRows == 0){
            throw new NotMatchedError
        }
        const deleteQuery = 'DELETE FROM blog WHERE blogIdx = ? AND writer = ?';
        const deleteValues = [blogIdx, writer];
        const deleteResult = await db.queryParam_Parse(deleteQuery, deleteValues);
        if(typeof(deleteResult) == 'undefined'){
            throw new DatabaseError;
        } else if(deleteResult.affectedRows == 0){
            throw new NotMatchedError
        }
    }
}
module.exports = blog;