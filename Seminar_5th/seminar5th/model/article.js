const pool = require('../modules/db/pool');
const articleData = require('../modules/data/articleData');
const articleImageData = require('../modules/data/articleImageData');
const jwtExt = require('../modules/security/jwt-ext');
const { NotMatchedError, ParameterError, DatabaseError } = require('../errors');
const TABLE_NAME_ARTICLE = 'article';
const TABLE_NAME_ARTICLE_IMAGE = 'articleImage';

const article = {
    create: async (
        image,
        {title, content}, 
        blogIdx, 
        token) => {
            if(!title || !content) throw new ParameterError
            const writer = jwtExt.verify(token).data.id
            const query = `INSERT INTO ${TABLE_NAME_ARTICLE}(title, content, writer, blogIdx) VALUES (?, ?, ?, ?)`;
            const values = [title, content, writer, blogIdx];
            const result = await pool.queryParam_Parse(query, values);
            if(typeof(result) == 'undefined'){
                throw new DatabaseError;
            } else if(result.affectedRows == 0){
                throw new NotMatchedError
            }
            for(var i in image) {
                const imageQuery = 'INSERT INTO articleImage(articleImageUrl, articleIdx) VALUES(?, ?)';
                const imageValues = [image[i].location, articleResult.insertId];
                const imageResult = await pool.queryParam_Parse(imageQuery, imageValues);
                if(typeof(imageResult) == 'undefined'){
                    throw new DatabaseError;
                } else if(imageResult.affectedRows == 0){
                    throw new NotMatchedError
                }      
            }
    },
    read: async (articleIdx) => {
        if(!articleIdx) throw new ParameterError
        const query = `SELECT * FROM ${TABLE_NAME_ARTICLE} WHERE articleIdx = ?`;
        const values = [articleIdx];
        const result = await pool.queryParam_Parse(query, values);
        if(typeof(result) == 'undefined'){
            throw new DatabaseError;
        } else if(result.length == 0){
            throw new NotMatchedError
        } else {
            const imageQuery = `SELECT * FROM ${TABLE_NAME_ARTICLE_IMAGE} WHERE articleIdx = ?`;
            const imageValues = [articleIdx];
            const imageResult = await pool.queryParam_Parse(imageQuery, imageValues);
            let imageArr = [];
            if(typeof(imageResult) == 'undefined'){
                throw new DatabaseError;
            } else if(imageResult.length == 0){
                    imageArr = [];
            } else {
                imageResult.forEach((rawArticle, index, result) => {
                    imageArr.push(articleImageData(rawArticle).articleImageUrl);
                });
            }
            const article = articleData(result[0]);
            article.imageArr = imageArr;
            return article;
        }
    },
    readAll: async (blogIdx) => {
        if(!blogIdx) throw new ParameterError;
        const query = `SELECT * FROM ${TABLE_NAME_ARTICLE} WHERE blogIdx = ?`;
        const values = [blogIdx];
        const result = await pool.queryParam_Parse(query, values);
        if(typeof(result) == 'undefined'){
            throw new DatabaseError;
        } else if(result.length == 0){
            throw new NotMatchedError;
        } else {
            var articleArr = [];
            const articleIdxArr = [];
            result.forEach((rawArticle, index, result) => {
                articleIdxArr.push(articleData(rawArticle).articleIdx);
            });
            for(var i in articleIdxArr){
                await article.read(articleIdxArr[i])
                .then(result => articleArr.push(result))
                .catch(err => {throw new DatabaseError});
            }
            return articleArr;
        }
    },
    readAllArticle: async () => {
        const query = `SELECT * FROM ${TABLE_NAME_ARTICLE}`;
        const result = await pool.queryParam_None(query);
        if(typeof(result) == 'undefined'){
            throw new DatabaseError;
        } else {
            const articleArr = [];
            result.forEach((rawArticle, index, result) => {
                articleArr.push(articleData(rawArticle));
            });
            return articleArr;
        }
    },
    update: async (image,{
        articleIdx,
        title,
        content
    }, blogIdx,token) => {
        if(!title || !content) throw new ParameterError
        const writer = jwtExt.verify(token).data.id
        const putQuery = `UPDATE ${TABLE_NAME_ARTICLE} SET title = ?, content = ? WHERE blogIdx = ? AND articleIdx = ? AND writer = ?`;
        const putValue = [title, content, blogIdx, articleIdx, writer];
        const putResult = await pool.queryParam_Parse(putQuery,putValue);
        console.log('putResult',putResult);
        if(typeof(putResult) == 'undefined'){
            throw new DatabaseError;
        } else if(putResult.affectedRows == 0){
            throw new NotMatchedError;
        }
        const deleteImageQuery = `DELETE FROM ${TABLE_NAME_ARTICLE_IMAGE} WHERE articleIdx = ?`;
        const deleteImageValues = [articleIdx]
        const deleteImageResult = await pool.queryParam_Parse(deleteImageQuery, deleteImageValues);
        if(typeof(deleteImageResult) == 'undefined'){
            throw new DatabaseError;
        } else if(deleteImageResult.affectedRows == 0){
            throw new NotMatchedError;
        }
        for(var i in image) {
            const postImageQuery = `INSERT INTO ${TABLE_NAME_ARTICLE_IMAGE}(articleImageUrl, articleIdx) VALUES(?, ?)`;
            const postImageValues = [image[i].location, articleIdx];
            const postImageResult = await pool.queryParam_Parse(postImageQuery, postImageValues);
            if(typeof(postImageResult) == 'undefined'){
                throw new DatabaseError;
            } else if(postImageResult.affectedRows == 0){
                throw new NotMatchedError;
            }
        }
    },
    delete: async ({articleIdx}, blogIdx, token) => {
        const writer = jwtExt.verify(token).data.id
        const getQuery = 'SELECT * FROM article WHERE blogIdx = ? AND articleIdx = ? AND writer = ?';
        const getValues = [blogIdx, articleIdx, writer];
        const getResult = await pool.queryParam_Parse(getQuery, getValues);
        if(typeof(getResult) == 'undefined'){
            throw new DatabaseError;
        } else if(getResult.affectedRows == 0){
            throw new NotMatchedError;
        }
        const deleteQuery = 'DELETE FROM article WHERE blogIdx = ? AND articleIdx = ? AND writer = ?';
        const deleteValues = [blogIdx, articleIdx, writer];
        const deleteResult = await pool.queryParam_Parse(deleteQuery, deleteValues);
        if(typeof(deleteResult) == 'undefined'){
            throw new DatabaseError;
        } else if(deleteResult.affectedRows == 0){
            throw new NotMatchedError;
        }
    }
}

module.exports = article;