const Blog = require('../model/blog');
const {util, status, message} = require('../modules/utils');
const NAME = '카테고리';

module.exports = {
    readAll: async(req, res) => 
        Blog.readAll()
        .then(result => 
            res.status(status.OK)
            .send(util.successTrue(message.X_READ_SUCCESS(NAME), result)))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))
    ,
    read: async(req, res) => 
        Blog.read(req.params.blogIdx)
        .then(result => 
            res.status(status.OK)
            .send(util.successTrue(message.X_READ_SUCCESS(NAME), result)))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))
    ,
    create: async(req, res) => 
        Blog.create(req.body, req.headers.token)
        .then(() =>
            res.status(status.OK)
            .send(util.successTrue(message.X_CREATE_SUCCESS(NAME))))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))
    ,
    update: async(req, res) => 
        Blog.update(req.body, req.headers.token)
        .then(() =>
            res.status(status.OK)
            .send(util.successTrue(message.X_UPDATE_SUCCESS(NAME))))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))
    ,
    delete: async(req, res) => 
        Blog.delete(req.body, req.headers.token)
        .then(() =>
            res.status(status.OK)
            .send(util.successTrue(message.X_DELETE_SUCCESS(NAME))))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))
}