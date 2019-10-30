const express = require('express');
const router = express.Router({
    mergeParams: true
});
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../module/utils/responseMessage');
const authUtil = require('../../../module/utils/authUtil');
const Article = require('../../../model/Article');

const THIS_LOG = '게시글';
/*
    [GET] localhost/blogs/${blogIdx}/articles
    게시글 전체 보기
*/
router.get('/',(req,res) => {
    /**
     * TODO 1 Model에서 값 받아오기
     */
    Article.readAll();
    /**
     * TODO 2 결과값 출력
     */
    const result = [{
        articleIdx: 0,
        title: 'nodejs 시작하기',
        content: 'nodejs란...',
        blogIdx
    }];
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.X_READ_ALL_SUCCESS(THIS_LOG),
        result));
});
router.get('/:articleIdx',(req,res) => {
    const {blogIdx, articleIdx} = req.params;
    // TODO 1 parameter null check
    /**
     * TODO 3 결과값 출력
     */
    const result = {
        articleIdx,
        blogIdx,
        title: 'nodejs 시작하기',
        content: 'nodejs란...'
    };
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.X_READ_SUCCESS(THIS_LOG),
        result));
});

/**
 * [POST] localhost/blogs/${blogIdx}/articles
 * 게시글 생성하기
 */
router.post('/',(req,res) => {
    const {blogIdx} = req.params;
    //TODO 1 parameter null check
    const {} = req.body;
    const json = {};
    /**
     * TODO 2 Model에서 값 받아오기
     */
    Article.update(json);
    /**
     * TODO 3 결과값 출력
     */
    const result = {
        articleIdx: 0,
        title: 'nodejs 시작하기',
        content: 'nodejs 란...',
        blogIdx: blogIdx
    };
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.X_CREATE_SUCCESS(THIS_LOG),
        result));
});
/**
 * [PUT] localhost/blogs/${blogIdx}/articles]
 * 게시글 수정하기
 */

router.post('/',(req,res) => {
    const {blogIdx} = req.params;
    // TODO 1 parameter null check
    const {} = req.body;
    const json = {};
    /**
     * TODO 2 Model에서 값 받아오기
     */
    Article.update(json);
    /**
     * TODO 3 결과값 출력
     */

    const result = {
        articleIdx: 0,
        title: 'nodejs 시작하기',
        content: 'nodejs란...',
        blogIdx: blogIdx
    };
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.X_UPDATE_SUCCESS(THIS_LOG),
        result));
});
/**
 * [DELETE] localhost/blogs/${blogIdx}/articles
 * 게시글 삭제하기
 */

router.delete('/', (req,res) => {
    //TODO 2 Model에서 값 받아오기
    Article.delete(json);
    /**
     * TODO 3 결과값 출력
     */
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.X_DELETE_SUCCESS(THIS_LOG)));
});

module.exports = router;
