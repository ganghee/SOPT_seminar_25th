module.exports = 
    (rawBlogData) => {
        blogData = {
            "blogIdx": rawBlogData.blogIdx,
            "title": rawBlogData.title,
            "content": rawBlogData.content,
            "writer": rawBlogData.writer,
        }
        return blogData;
    }
    