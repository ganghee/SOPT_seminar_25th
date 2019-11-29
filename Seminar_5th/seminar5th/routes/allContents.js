const express = require('express');
const router = express.Router({mergeParams: true});

const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');

const Article = require('../model/article');
const Comment = require('../model/comment');

router.get('/articles',(req,res) => {
    Article.readAllArticle().then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('/comments',(req,res) => {
    Comment.readAllComment().then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;