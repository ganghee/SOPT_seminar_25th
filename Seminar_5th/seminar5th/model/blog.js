const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');
const db = require('../modules/db/pool')
const blogData = require('../modules/data/blogData')
const jwtExt = require('../modules/security/jwt-ext');

const THIS_LOG = '카테고리';

const blog = {
    create: ({
        title,
        content
        }, token) => {
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
            const postBlogQuery = 'INSERT INTO blog(title, content, writer) VALUES (?, ?, ?)';
            const postBlogResult = await db.queryParam_Parse(postBlogQuery,[title, content, writer]);
            if(typeof(getUserpostBlogResultResult) == 'undefined' || postBlogResult.affectedRows == 0){
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
    read: (blogIdx) => {
        return new Promise(async(resolve,reject) => {
            const getBlogQuery = 'SELECT * FROM blog WHERE blogIdx = ?';
            const getBlogResult = await db.queryParam_Parse(getBlogQuery,[blogIdx]);
            if(typeof(getBlogResult) == 'undefined' || getBlogResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_FAIL(THIS_LOG)
                )});
            } else {
                const blog = blogData(getBlogResult[0]);
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_SUCCESS(THIS_LOG),
                        blog
                )});
            }
        });
    },
    readAll: () => {
        return new Promise(async (resolve,reject) => {
            const getAllBlogQuery = 'SELECT * FROM blog';
            const getAllBlogResult = await db.queryParam_None(getAllBlogQuery);
            if (typeof(getAllBlogResult) == 'undefined' || getAllBlogResult.affectedRows == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_ALL_FAIL(THIS_LOG)
                )});
            } else {
                const blogArr = [];
                getAllBlogResult.forEach((rawBlog, index, result) => {
                    blogArr.push(blogData(rawBlog));
                });
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_ALL_SUCCESS(THIS_LOG),
                        blogArr
                )});
            }
        });
    },
    update: ({
        blogIdx,
        title,
        content
    }, token) => {
        return new Promise(async(resolve,reject) => {
            if(!blogIdx || !title || !content){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const writer = jwtExt.verify(token).data.id
            const getBlogQuery = 'SELECT * FROM blog WHERE blogIdx = ? AND writer = ?';
            const getBlogResult = await db.queryParam_Parse(getBlogQuery,[blogIdx, writer]);
            if (typeof(getBlogResult) == 'undefined' || getBlogResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const putBlogQuery = 'UPDATE blog SET title = ?, content = ?, writer = ? WHERE blogIdx = ?';
            const putBlogResult = await db.queryParam_Parse(putBlogQuery,[title, content, writer, blogIdx])
            if(typeof(putBlogResult) == 'undefined' || putBlogResult.affectedRows == 0){
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
    remove: ({blogIdx}, token) => {
        return new Promise(async(resolve,reject) => {
            const writer = jwtExt.verify(token).data.id
            const getBlogQuery = 'SELECT * FROM blog WHERE blogIdx = ? AND writer = ?';
            const getBlogResult = await db.queryParam_Parse(getBlogQuery, [blogIdx, writer] );
            if (typeof(getBlogResult) == 'undefined' || getBlogResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const deleteBlogQuery = 'DELETE FROM blog WHERE blogIdx = ? AND writer = ?';
            const deleteBlogResult = await db.queryParam_Parse(deleteBlogQuery,[blogIdx, writer]);
            if (typeof(deleteBlogResult) == 'undefined' || deleteBlogResult.affectedRows == 0) {
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
module.exports = blog;