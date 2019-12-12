module.exports = 
(rawArticleImageData) => {
    articleImageData = {
        "articleImageIdx": rawArticleImageData.articleIdx,
        "articleImageUrl": rawArticleImageData.articleImageUrl,
        "articleIdx": rawArticleImageData.articleIdx
    }
    return articleImageData
}
