const pool = require('../modules/db/pool');
const articleData = require('../modules/data/articleData');
const articleImageData = require('../modules/data/articleImageData');
const jwtExt = require('../modules/security/jwt-ext');
const { 
    AuthorizationError, 
    ParameterError,
    NotCreatedError,
    NotDeletedError,
    NotFoundError,
} = require('../errors');
const TABLE_NAME_ARTICLE = 'article';
const TABLE_NAME_ARTICLE_IMAGE = 'articleImage';
const ARTICLE = '게시글';
const ARTICLE_IMAGE = "게시글 사진";

const article = {
    create: async (
        image,
        {title,
        content}, 
        blogIdx, 
        token) => {
            if(!title || !content) throw new ParameterError
            const writer = jwtExt.verify(token).data.id
            const query = `INSERT INTO ${TABLE_NAME_ARTICLE}(title, content, writer, blogIdx) VALUES (?, ?, ?, ?)`;
            const values = [title, content, writer, blogIdx];
            const result = await pool.queryParam_Parse(query, values);
            if(result.affectedRows == 0) throw new NotCreatedError(ARTICLE)
            for(var i in image) {
                const imageQuery = `INSERT INTO ${TABLE_NAME_ARTICLE_IMAGE}(articleImageUrl, articleIdx) VALUES(?, ?)`;
                const imageValues = [image[i].location, result.insertId];
                const imageResult = await pool.queryParam_Parse(imageQuery, imageValues);
                if(imageResult.affectedRows == 0) throw new NotCreatedError(ARTICLE_IMAGE)
            }
    },
    read: async (articleIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME_ARTICLE} WHERE articleIdx = ?`;
        const values = [articleIdx];
        const result = await pool.queryParam_Parse(query, values);
        if(result.length == 0) throw new NotFoundError(ARTICLE);
        const imageQuery = `SELECT * FROM ${TABLE_NAME_ARTICLE_IMAGE} WHERE articleIdx = ?`;
        const imageValues = [articleIdx];
        const imageResult = await pool.queryParam_Parse(imageQuery, imageValues);
        let imageArr = [];
        if(imageResult.length == 0) imageArr = [];
        imageResult.forEach((rawArticle, index, result) => 
            imageArr.push(articleImageData(rawArticle).articleImageUrl));
        const article = articleData(result[0]);
        article.imageArr = imageArr;
        return article;
    },
    readAll: async (blogIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME_ARTICLE} WHERE blogIdx = ?`;
        const values = [blogIdx];
        const result = await pool.queryParam_Parse(query, values);
        if(result.length == 0) throw new NotFoundError(ARTICLE)
        let articleArr = [];
        const articleIdxArr = [];
        result.forEach((rawArticle, index, result) => 
            articleIdxArr.push(articleData(rawArticle).articleIdx));
        for(var i in articleIdxArr){
            await article.read(articleIdxArr[i])
            .then(result => articleArr.push(result))}
        return articleArr;
    },
    readAllArticle: async () => {
        const query = `SELECT * FROM ${TABLE_NAME_ARTICLE}`;
        const result = await pool.queryParam_None(query);
        if(result.length == 0) throw new NotFoundError(ARTICLE)
        const articleArr = [];
        result.forEach((rawArticle, index, result) => 
            articleArr.push(articleData(rawArticle)));
        return articleArr;
    },
    update: async (
        image,
        {articleIdx,
        title,
        content},
        blogIdx,
        token) => {
            if(!title || !content) throw new ParameterError
            const writer = jwtExt.verify(token).data.id
            const putQuery = `UPDATE ${TABLE_NAME_ARTICLE} SET title = ?, content = ? WHERE blogIdx = ? AND articleIdx = ? AND writer = ?`;
            const putValue = [title, content, blogIdx, articleIdx, writer];
            const putResult = await pool.queryParam_Parse(putQuery,putValue);
            console.log('putResult',putResult);
            if(putResult.affectedRows == 0) throw new AuthorizationError(ARTICLE);
            const deleteImageQuery = `DELETE FROM ${TABLE_NAME_ARTICLE_IMAGE} WHERE articleIdx = ?`;
            const deleteImageValues = [articleIdx]
            const deleteImageResult = await pool.queryParam_Parse(deleteImageQuery, deleteImageValues);
            if(deleteImageResult.affectedRows == 0) throw new NotDeletedError(ARTICLE_IMAGE);
            for(var i in image) {
                const postImageQuery = `INSERT INTO ${TABLE_NAME_ARTICLE_IMAGE}(articleImageUrl, articleIdx) VALUES(?, ?)`;
                const postImageValues = [image[i].location, articleIdx];
                const postImageResult = await pool.queryParam_Parse(postImageQuery, postImageValues);
                if(postImageResult.affectedRows == 0) throw new NotCreatedError(ARTICLE_IMAGE);
            }
    },
    delete: async (
        {articleIdx}, 
        blogIdx, 
        token) => {
            const writer = jwtExt.verify(token).data.id
            const getQuery = `SELECT * FROM ${TABLE_NAME_ARTICLE} WHERE blogIdx = ? AND articleIdx = ? AND writer = ?`;
            const getValues = [blogIdx, articleIdx, writer];
            const getResult = await pool.queryParam_Parse(getQuery, getValues);
            if(getResult.length == 0) throw new AuthorizationError(ARTICLE);
            const deleteQuery = `DELETE FROM ${TABLE_NAME_ARTICLE} WHERE blogIdx = ? AND articleIdx = ? AND writer = ?`;
            const deleteValues = [blogIdx, articleIdx, writer];
            const deleteResult = await pool.queryParam_Parse(deleteQuery, deleteValues);
            if(deleteResult.affectedRows == 0) throw new NotDeletedError(ARTICLE)
    }
}

module.exports = article;