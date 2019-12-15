const User = require('../model/user');
const {util, status, message} = require('../modules/utils');
const NAME = '사용자';

module.exports = {
    signUp: async(req, res) => {
        User.signUp(req.body)
        .then(
            res.status(status.OK)
            .send(util.successTrue(message.SIGNUP_SUCCESS)))
        .catch(err => {
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        })
    },
    signIn: async(req, res) => {
        User.signIn(req.body)
        .then(
            res.status(status.OK)
            .send(util.successTrue(message.LOGIN_SUCCESS)))
        .catch(err => {
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        })
    },
    update: async(req, res) => {
        User.update(req.body, req.headers.token)
        .then(
            res.status(status.OK)
            .send(util.successTrue(message.X_UPDATE_SUCCESS(NAME))))
        .catch(err => {
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    },
    remove: async(req, res) => {
        User.remove(req.headers.token)
        .then(
            res.status(status.OK)
            .send(util.successTrue(message.X_DELETE_SUCCESS(NAME))))
        .catch(err => {
            res.status(err.status || 500);
            res.send(util.successFalse(err.message));
        });
    }
}