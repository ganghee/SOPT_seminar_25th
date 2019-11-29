const express = require('express'); 
const router = express.Router({mergeParams: true});
const jwt = require('../../Module/jwt');
const util = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const {LoggedIn} = require('../../module/utils/authUtil');

router.post('/verify', (req, res) => { 
    const {token} = req.headers;
    const result = jwt.verify(token); 
    if(result == -1) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(resMessage.EXPIRED_TOKEN)); 
    }
    if(result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(resMessage.INVALID_TOKEN)); 
    }
    res.json(result);
});

router.post('/publish', (req, res) => { 
    const {idx, grade, name} = req.body; 
    if(!idx || !grade || !name){
        res.send("wrong parameter");
        return;
    }
    const result = jwt.sign({idx, grade, name});
    res.json(result); 
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.headers.refreshtoken; 
    const selectUser = {
        idx: 1,
        grade: 1,
        id: 'genie', 
        name: 'genie'
    };
    const newAccessToken = jwt.refresh(selectUser);
    res.status(statusCode.OK).send(util.successTrue(resMessage.REFRESH_TOKEN, newAccessToken)); 
});

router.use('/middleware',LoggedIn)
router.post('/middleware', (req, res) => { 
    res.json(req.decoded);
});

module.exports = router;