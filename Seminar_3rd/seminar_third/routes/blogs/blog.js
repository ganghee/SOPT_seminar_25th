const express = require('express');
const router = express.Router({mergeParams: true});

const statusCode = require('../../module/utils/statusCode');
const responseMessage = require('../../module/utils/responseMessage');
const authUtil = require('../../module/utils/authUtil');

const Blog = require('../../model/Blog');

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
    })
});
module.exports = router;