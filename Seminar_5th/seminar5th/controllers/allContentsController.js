const Article = require('../model/article');
const Comment = require('../model/comment');
const {util, status, message} = require('../modules/utils');
const ARTICLE_NAME = '모든 게시글';
const COMMENT_NAME = '모든 댓글';

module.exports = {
    readAllArticle: async (req, res) => {
        Article.readAllArticle()
        .then(result => {
            res.status(status.OK)
            .send(util.successTrue(message.X_READ_SUCCESS(ARTICLE_NAME), result));})
        .catch(err => {
            console.log(err);
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    },
    readAllComment: async (req, res) => {
        Comment.readAllComment()
        .then(result => {
            res.status(status.OK)
            .send(util.successTrue(message.X_READ_SUCCESS(COMMENT_NAME), result));})
        .catch(err => {
            console.log(err);
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    }
}