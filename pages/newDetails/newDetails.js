// pages/newDetails/newDetails.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        data: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.setData({
            id: options.id
        })
        this.getNewsDetailsData()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /**
     * 获取新闻详情
     */
    getNewsDetailsData: function() {
        app.http.http(app.apis.gethotNesContent, "get", {
            id: this.data.id
        }).then(res => {
            res.data.imgUrls = res.data.imgUrls.map(item => {
                if (item.includes('undefined')) {
                    return item.substring(9)
                }
                return item
            })
            this.setData({
                data: res.data
            })
        })
    }
})