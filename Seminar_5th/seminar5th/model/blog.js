const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');

const db = require('../modules/db/pool')
const blogData = require('../modules/data/blogData')

const THIS_LOG = '카테고리';

const blog = {
    create: ({
        title,
        content,
        writer
        }) => {
            return new Promise(async(resolve,reject) => {
                if(!title || !content || !writer){
                    resolve({
                        code: statusCode.NOT_FOUND,
                        json: authUtil.successFalse(
                            responseMessage.NULL_VALUE
                        )
                    });
            } 
            const postBlogQuery = 'INSERT INTO blog(title, content, writer) VALUES (?, ?, ?)';
            const postBlogResult = await db.queryParam_Parse(postBlogQuery,[title, content, writer]);
            if(!postBlogResult){
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
            if(getBlogResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_FAIL(THIS_LOG)
                )});
            } 
            const blog = blogData(getBlogResult[0]);
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.X_READ_SUCCESS(THIS_LOG),
                    blog
            )});
        });
    },
    readAll: () => {
        return new Promise(async (resolve,reject) => {
            const getAllBlogQuery = 'SELECT * FROM blog';
            const getAllBlogResult = await db.queryParam_None(getAllBlogQuery);
            if (!getAllBlogResult) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.X_READ_ALL_FAIL(THIS_LOG)
                )});
            } 
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
        });
    },
    update: ({
        blogIdx,
        title,
        content,
        writer
    }) => {
        return new Promise(async(resolve,reject) => {
            if(!blogIdx || !title || !content || !writer){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            } 
            const getBlogQuery = 'SELECT * FROM blog WHERE blogIdx = ?';
            const getBlogResult = await db.queryParam_Parse(getBlogQuery,[body.blogIdx]);
            console.log(getBlogResult);
            if (getBlogResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const putBlogQuery = 'UPDATE blog SET title = ?, content = ?, writer = ? WHERE blogIdx = ?';
            const putBlogResult = await db.queryParam_Parse(putBlogQuery,[title, content, writer, blogIdx])
            console.log(putBlogResult);
            if(!putBlogResult){
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
    remove: (body) => {
        return new Promise(async(resolve,reject) => {
            const getBlogQuery = 'SELECT * FROM blog WHERE blogIdx = ?';
            const getBlogResult = await db.queryParam_Parse(getBlogQuery, [body.blogIdx] );

            if (getBlogResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(
                        responseMessage.NULL_VALUE
                    )
                });
            }
            const deleteBlogQuery = 'DELETE FROM blog WHERE blogIdx = ?';
            const deleteBlogResult = await db.queryParam_Parse(deleteBlogQuery,[body.blogIdx]);
            console.log(deleteBlogResult);

            if (!deleteBlogResult) {
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