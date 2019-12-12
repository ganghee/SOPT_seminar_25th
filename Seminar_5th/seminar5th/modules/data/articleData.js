module.exports = 
    (rawArticleData) => {
        articleData = {
            "articleIdx": rawArticleData.articleIdx,
            "title": rawArticleData.title,
            "content": rawArticleData.content,
            "writer": rawArticleData.writer,
            "blogIdx": rawArticleData.blogIdx
        }
        return articleData
    }
