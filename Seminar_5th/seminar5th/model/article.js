const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');
const db = require('../modules/db/pool');
const articleData = require('../modules/data/articleData');
const articleImageData = require('../modules/data/articleImageData');
const jwtExt = require('../modules/security/jwt-ext');

const THIS_LOG = '게시글';

const article = {
    create: (image,{
        title,
        content
    },blogIdx,token) => {
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
            const postArticleQuery = 'INSERT INTO article(title, content, writer, blogIdx) VALUES (?, ?, ?, ?)';
            const postArticleResult = await db.queryParam_Parse(postArticleQuery,[title, content, writer, blogIdx]);
            if(typeof(postArticleResult) == 'undefined' || postArticleResult.affectedRows == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_CREATE_FAIL(THIS_LOG)
                )});
            }
            for(var i in image) {
                const postArticleImageQuery = 'INSERT INTO articleImage(articleImageUrl, articleIdx) VALUES(?, ?)';
                const postArticleImageResult = await db.queryParam_Parse(postArticleImageQuery,[image[i].location, postArticleResult.insertId]);
                if(typeof(postArticleImageResult) == 'undefined' || postArticleImageResult.affectedRows == 0){
                    resolve({
                        code: statusCode.NOT_FOUND,
                        json: authUtil.successFalse(
                            responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )});
                }
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_CREATE_SUCCESS(THIS_LOG)
            )});
        });
    },
    read: (blogIdx, articleIdx) => {
        return new Promise(async (resolve,reject) => {
            const getArticleQuery = 'SELECT * FROM article WHERE blogIdx = ? AND articleIdx = ?';
            const getArticleResult = await db.queryParam_Parse(getArticleQuery,[blogIdx, articleIdx]);
            if(typeof(getArticleResult) == 'undefined' || getArticleResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_FAIL(THIS_LOG)
                )});
            }
            const getArticleImageQuery = "SELECT * FROM articleImage WHERE articleIdx = ?";
            const getArticleImageResult = await db.queryParam_Parse(getArticleImageQuery,[articleIdx]);
            if(typeof(getArticleImageResult) == 'undefined' || getArticleImageResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_FAIL(THIS_LOG)
                )});
            } else {
                const articleImageArr = []
                getArticleImageResult.forEach((rawArticle, index, result) => {
                    articleImageArr.push(articleImageData(rawArticle).articleImageUrl);
                });
                const article = articleData(getArticleResult[0]);
                article.articleImageArr = articleImageArr
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_SUCCESS(THIS_LOG),
                        article
                )});
            }
        });
    },
    readAll: (blogIdx) => {
        return new Promise(async (resolve,reject) => {
            const getAllArticleQuery = 'SELECT * FROM article WHERE blogIdx = ?';
            const getAllArticleResult = await db.queryParam_Parse(getAllArticleQuery,[blogIdx]);
            if (typeof(getAllArticleResult) == 'undefined' || getAllArticleResult.affectedRows == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_ALL_FAIL(THIS_LOG)
                )});
            } else {
                var articleArr = [];
                const articleIdxArr = []
                getAllArticleResult.forEach((rawArticle, index, result) => {
                    articleIdxArr.push(articleData(rawArticle).articleIdx);
                });
                for(var i in articleIdxArr){
                    articleArr.push(await article.read(blogIdx, articleIdxArr[i]).then(({
                        code,
                        json
                    }) => {
                        articleArr.push(json.data);
                    }).catch(err => {
                        console.log(err);
                    }));
                }
                articleArr = articleArr.filter(function(x) {return x !== undefined && x != null})
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_ALL_SUCCESS(THIS_LOG),
                        articleArr
                )});
            }
        });
    },
    readAllArticle: () => {
        return new Promise(async (resolve,reject) => {
            const getArticleQuery = 'SELECT * FROM article';
            const getArticlesResult = await db.queryParam_None(getArticleQuery);
            if(typeof(getArticlesResult) == 'undefined' || getArticlesResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_FAIL(THIS_LOG)
                )});
            } else {
                const articleArr = [];
                getArticlesResult.forEach((rawArticle, index, result) => {
                    articleArr.push(articleData(rawArticle));
                });
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_SUCCESS(THIS_LOG),
                        articleArr
                )});
            }
        });
    },
    update: (image,{
        articleIdx,
        title,
        content
    }, blogIdx,token) => {
        return new Promise(async(resolve,reject) => {
            if(!title || !content){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            } 
            const writer = jwtExt.verify(token).data.id;
            const getArticleQuery = 'SELECT * FROM article WHERE blogIdx = ? AND articleIdx = ? AND writer = ?';
            const getArticleResult = await db.queryParam_Parse(getArticleQuery,[blogIdx, articleIdx, writer]);
            if (typeof(getArticleResult) == 'undefined' || getArticleResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const putArticleQuery = 'UPDATE article SET title = ?, content = ? WHERE blogIdx = ? AND articleIdx = ? AND writer = ?';
            const putArticleResult = await db.queryParam_Parse(putArticleQuery,[title, content, blogIdx, articleIdx, writer])
            if(typeof(putArticleResult) == 'undefined' || putArticleResult.affectedRows == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_UPDATE_FAIL(THIS_LOG)
                    )
                });
            }
            const deleteArticleImageQuery = 'DELETE FROM articleImage WHERE articleIdx = ?';
            const deleteArticleImageResult = await db.queryParam_Parse(deleteArticleImageQuery,[articleIdx]);
            if(typeof(deleteArticleImageResult) == 'undefined' || deleteArticleImageResult.affectedRows == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_DELETE_FAIL(THIS_LOG)
                )});
            }
            for(var i in image) {
                const postArticleImageQuery = 'INSERT INTO articleImage(articleImageUrl, articleIdx) VALUES(?, ?)';
                const postArticleImageResult = await db.queryParam_Parse(postArticleImageQuery,[image[i].location, articleIdx]);
                if(typeof(postArticleImageResult) == 'undefined' || postArticleImageResult.affectedRows == 0){
                    resolve({
                        code: statusCode.NOT_FOUND,
                        json: authUtil.successFalse(
                            responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )});
                }
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_UPDATE_SUCCESS(THIS_LOG)
            )});
        });
    },
    remove: (body, blogIdx, token) => {
        return new Promise(async(resolve,reject) => {
            const writer = jwtExt.verify(token).data.id
            const getArticleQuery = 'SELECT * FROM article WHERE blogIdx = ? AND articleIdx = ? AND writer = ?';
            const getArticleResult = await db.queryParam_Parse(getArticleQuery, [blogIdx, body.articleIdx, writer] );
            if (typeof(getArticleResult) == 'undefined' || getArticleResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const deleteArticleQuery = 'DELETE FROM article WHERE blogIdx = ? AND articleIdx = ? AND writer = ?';
            const deleteArticleResult = await db.queryParam_Parse(deleteArticleQuery,[blogIdx, body.articleIdx, writer]);
            if (typeof(deleteArticleResult) == 'undefined' || deleteArticleResult.affectedRows == 0) {
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

module.exports = article;