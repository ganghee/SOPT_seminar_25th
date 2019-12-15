const Comment = require('../model/comment');
const {util, status, message} = require('../modules/utils');
const NAME = '댓글';

module.exports = {
    readAll: async(req, res) => {
        Comment.readAll(req.params.articleIdx)
        .then(result => {
            res.status(status.OK)
            .send(util.successTrue(message.X_READ_SUCCESS(NAME), result));})
        .catch(err => {
            console.log(err);
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    },
    read: async(req, res) => {
        Comment.read(req.params.articleIdx,req.params.commentIdx)
        .then(result => {
            res.status(status.OK)
            .send(util.successTrue(message.X_READ_SUCCESS(NAME), result));})
        .catch(err => {
            console.log(err);
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    },
    create: async(req, res) =>{
        Comment.create(req.body, req.params.articleIdx, req.headers.token)
        .then(
            res.status(status.OK)
            .send(util.successTrue(message.X_CREATE_SUCCESS(NAME))))
        .catch(err => {
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    },
    update: async(req, res) => {
        Comment.update(req.body, req.params.articleIdx, req.headers.token)
        .then(
            res.status(status.OK)
            .send(util.successTrue(message.X_UPDATE_SUCCESS(NAME))))
        .catch(err => {
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    },
    remove: async(req, res) => {
        Comment.remove(req.body, req.params.articleIdx, req.headers.token)
        .then(
            res.status(status.OK)
            .send(util.successTrue(message.X_DELETE_SUCCESS(NAME))))
        .catch(err => {
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    }
}