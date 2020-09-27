//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        data: []
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    btnclick: function() {
        // 登录
        console.log(app.apis.getUserCode)
        wx.login({
            success: res => {
                app.http.http(app.apis.getUserCode, "get", {
                    "js_code": res.code
                }).then(data => {
                    wx.setStorageSync('openid', data.data.openid)
                    wx.setStorageSync('session_key', data.data.session_key)
                    console.log(data)
                })

                console.log(res.code)
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId,6ea887423c3c2b07b65a25224518521a
            }
        })
    },
    onLoad: function() {
        this.getNewsTitle()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    getNewsTitle: function() {
        app.http.http(app.apis.gethotNesTitle).then(res => {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            this.setData({
                data: res.data
            })
            console.log(res)
        })
    },

    //下拉刷新
    onPullDownRefresh: function() {
        console.log(1)
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.getNewsTitle()
            // wx.showNavigationBarLoading() //在标题栏中显示加载

        // //模拟加载
        // setTimeout(function()
        // {
        //   // complete
        //   wx.hideNavigationBarLoading() //完成停止加载
        //   wx.stopPullDownRefresh() //停止下拉刷新
        // },1500);
    },
})