const express = require('express');
const router = express.Router({mergeParams: true});

const statusCode = require('../../module/utils/statusCode');
const responseMessage = require('../../module/utils/responseMessage');
const authUtil = require('../../module/utils/authUtil');

const Blog = require('../../model/Blog');

router.get('/',(req,res) => {
    Blog.readAll().then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('/:blogIdx',(req,res) => {
    Blog.read(req.params.blogIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.post('/',(req,res) => {
    Blog.create(req.body).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/**
 *  [PUT] localhost/blogs/
 *  블로그 수정하기
 */
router.put('/',(req,res) => {
    //TODO 1 parameter null check
    const {} = req.body;
    const json = {};
    /**
     *  TODO 2 Model에서 값 받아오기
     */
    Blog.update(json);
    /**
     *  TODO 3 결과값 출력
     */
    
});

/**
 *  [DELETE] localhost/blogs/
 *  블로그 삭제하기
 */
router.delete('/',(req,res) => {
    // TODO 1 parameter null check
    const {} = req.body;
    const json = {}
    /**
     * TODO 3 결과값 출력
     */
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.X_DELETE_SUCCESS(THIS_LOG)));
});
module.exports = router;