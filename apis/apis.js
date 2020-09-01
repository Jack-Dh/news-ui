let apiroot = "http://localhost:5000"
module.exports = {
    getUserCode: apiroot + "/user/login", //获取用户openid
    gethotNesTitle: apiroot + "/home/hot/newsTitle", //获取热点新闻标题
    gethotNesContent: apiroot + "/home/hot/newsContent/byId", //获取热点新闻内容
}