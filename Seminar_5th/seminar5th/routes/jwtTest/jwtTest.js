const express = require('express'); 
const router = express.Router({mergeParams: true});
const jwt = require('../../modules/security/jwt');
const util = require('../../modules/utils/utils');
const resMessage = require('../../modules/utils/responseMessage');
const statusCode = require('../../modules/utils/statusCode');
const {LoggedIn} = require('../../modules/utils/authUtil');

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
    const {id, date} = req.body; 
    if(!id || !date){
        res.send("wrong parameter");
        return;
    }
    const result = jwt.sign({id, date});
    res.json(result); 
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.headers.refreshToken; 
    const selectUser = {
        id: 1,
        date: "2019-12-11 05:50:41"
    };
    const newAccessToken = jwt.refresh(selectUser);
    res.status(statusCode.OK).send(util.successTrue(resMessage.REFRESH_TOKEN, newAccessToken)); 
});

router.use('/middleware',LoggedIn);
router.get('/middleware', (req, res) => {
    console.log(`req.decoded => ${req.decoded}`);
    res.json(req.decoded);
});


module.exports = router;