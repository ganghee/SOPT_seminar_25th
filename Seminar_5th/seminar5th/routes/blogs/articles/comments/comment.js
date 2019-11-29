const express = require('express'); 
const router = express.Router({mergeParams: true});

const statusCode = require('../../../../module/utils/statusCode');
const responseMessage = require('../../../../module/utils/responseMessage');
const authUtil = require('../../../../module/utils/authUtil');

const Comment = require('../../../../model/comment');

router.get('/',(req,res) => {
    Comment.readAll(req.params.articleIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('/:commentIdx', (req, res) => {
    Comment.read(req.params.articleIdx,req.params.commentIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.post('/', (req, res) => {
    Comment.create(req.body, req.params.articleIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.put('/', (req, res) => {
    Comment.update(req.body, req.params.articleIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.delete('/', (req, res) => {
    Comment.remove(req.body, req.params.articleIdx).then(({
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