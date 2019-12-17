const Article = require('../model/article');
const {util, status, message} = require('../modules/utils');
const NAME = '게시글';

module.exports = {
    readAll: async(req, res) => {
        const {blogIdx} = req.params;
        Article.readAll(blogIdx)
        .then(result =>
            res.status(status.OK)
            .send(util.successTrue(message.X_READ_SUCCESS(NAME), result)))
        .catch(err =>
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))}
    ,
    read: async(req, res) => {
        const {articleIdx} = req.params;
        Article.read(articleIdx)
        .then(result => 
            res.status(status.OK)
            .send(util.successTrue(message.X_READ_SUCCESS(NAME), result)))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))}
    ,
    create: async(req, res) => 
        Article.create(req.files, req.body, req.params.blogIdx, req.headers.token)
        .then(() =>
            res.status(status.OK)
            .send(util.successTrue(message.X_CREATE_SUCCESS(NAME))))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))
    ,
    update: async(req, res) => 
        Article.update(req.files, req.body, req.params.blogIdx, req.headers.token)
        .then(() =>
            res.status(status.OK)
            .send(util.successTrue(message.X_UPDATE_SUCCESS(NAME))))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))
    ,
    delete: async(req, res) => 
        Article.delete(req.body, req.params.blogIdx, req.headers.token)
        .then(() =>
            res.status(status.OK)
            .send(util.successTrue(message.X_DELETE_SUCCESS(NAME))))
        .catch(err => 
            res.status(err.status || 500)
            .send(util.successFalse(err.message)))
}