const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');
const Comment = require('../model/comment');

module.exports = {
    readAll: async(req, res) => {
        Comment.readAll(req.params.articleIdx).then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
    },
    read: async(req, res) => {
        Comment.read(req.params.articleIdx,req.params.commentIdx).then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
    },
    create: async(req, res) =>{
        Comment.create(req.body, req.params.articleIdx).then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
    },
    update: async(req, res) => {
        Comment.update(req.body, req.params.articleIdx).then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
    },
    remove: async(req, res) => {
        Comment.remove(req.body, req.params.articleIdx).then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
    }
}