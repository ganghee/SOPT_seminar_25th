const statusCode = require('../module/utils/statusCode');
const responseMessage = require('../module/utils/responseMessage');
const authUtil = require('../module/utils/authUtil');

const db = require('../module/db/pool')
const blogData = require('../module/data/blogData')

const THIS_LOG = '블로그';

const blog = {
    create: (body) => {
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
                        responseMessage.X_CREATE_FAIL(THIS_LOG)
                    )
                });
            } else{
                const postBlogQuery = 'INSERT INTO blog(title, content, writer) VALUES (?, ?, ?)';
                const postBlogResult = await db.queryParam_Parse(postBlogQuery,[title, content, writer]);
                if(!postBlogResult){
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
            } else{
                let blog = blogData(getBlogResult[0]);
                resolve({
                    code: statusCode.OK,
                    json: authUtil.successTrue(
                        responseMessage.X_READ_ALL_SUCCESS(THIS_LOG),
                        blog
                )});
            }
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
            } else {
                let blogArr = [];
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
    update: () => {
    },
    remove: () => {
    }
}
module.exports = blog;