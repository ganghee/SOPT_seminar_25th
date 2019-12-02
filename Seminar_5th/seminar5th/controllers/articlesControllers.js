const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');
const upload = require('../config/multer');

const Article = require('../model/article');

module.exports = {
    readAll: async(req, res) => {
        Article.readAll(req.params.blogIdx).then(({
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
        Article.read(req.params.blogIdx, req.params.articleIdx).then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
    },
    create: async(req, res) => {
        console.log("image",req.file.location);
        Article.create(req.file.location, req.body, req.params.blogIdx).then(({
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
        Article.update(req.body, req.params.blogIdx).then(({
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
        Article.remove(req.body, req.params.blogIdx).then(({
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