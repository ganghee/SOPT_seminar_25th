const express = require('express');
const jwt = require('../security/jwt');
const router = express.Router({mergeParams: true});
const resMessage = require('./responseMessage');
const statusCode = require('./statusCode');
const util = require('./util');

const authUtil = {
    successTrue: (message, data) => { 
        return {
            success: true,
            message: message, 
            data: data
        } 
    },
    successFalse: (message) => { 
        return {
            success: false,
            message: message 
        }
    }, 
    LoggedIn: async(req, res, next) => {
        console.log("미들 웨어");
        var token = req.headers.token;
        if(!token){
            return res.status(statusCode.BAD_REQUEST).
            send(util.successFalse(resMessage.NO_TOKEN))
        }
        const result = jwt.verify(token); 
        console.log(result);
        if(result == -1) {
            return res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.EXPIRED_TOKEN)); 
        }
        if(result == -2) {
            return res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.INVALID_TOKEN)); 
        }
        const userIdx = result.idx;
        req.decoded = userIdx;
        next();
    }
}
module.exports = authUtil;