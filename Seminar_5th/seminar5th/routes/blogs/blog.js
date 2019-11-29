const express = require('express');
const router = express.Router({mergeParams: true});

const statusCode = require('../../modules/utils/statusCode');
const responseMessage = require('../../modules/utils/responseMessage');
const authUtil = require('../../modules/utils/authUtil');

const Blog = require('../../model/blog');
router.use('/:blogIdx/articles', require('./articles'));

router.get('/',(req,res) => {
    Blog.readAll().then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('/:blogIdx',(req,res) => {
    Blog.read(req.params.blogIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.post('/',(req,res) => {
    Blog.create(req.body).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.put('/',(req,res) => {
    Blog.update(req.body).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.delete('/',(req,res) => {
    Blog.remove(req.body).then(({
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