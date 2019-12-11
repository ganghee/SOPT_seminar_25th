const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');
const authUtil = require('../modules/utils/authUtil');

const User = require('../model/user');

module.exports = {
    signUp: async(req, res) => {
        User.signUp(req.body).then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
    },
    signIn: async(req, res) => {
        User.signIn(req.body).then(({
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
        User.update(req.body).then(({
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
        User.remove(req.body).then(({
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