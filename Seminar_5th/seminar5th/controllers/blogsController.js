const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');

const Blog = require('../model/blog');

module.exports = {
    readAll: async(req, res) => {
        Blog.readAll().then(({
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
        Blog.read(req.params.blogIdx).then(({
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
        Blog.create(req.body).then(({
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
        Blog.update(req.body).then(({
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
        Blog.remove(req.body).then(({
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