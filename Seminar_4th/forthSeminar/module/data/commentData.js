
module.exports = 
(rawCommentData) => {
    commentData = {
        "commentIdx": rawCommentData.commentIdx,
        "title": rawCommentData.title,
        "content": rawCommentData.content,
        "writer": rawCommentData.writer,
        "articleIdx": rawCommentData.articleIdx
    }
    return commentData;
}