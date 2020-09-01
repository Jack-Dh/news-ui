function http(url, method = "get", data) {
    return new Promise(function(resolve, reject) {
        wx.request({
            url,
            data,
            method,
            header: {
                "Content-Type": method == "get" ? "json" : "application/x-www-form-urlencoded"
            },
            success: function(res) {
                // return typeof cb == "function" && cb(res.data)
                return resolve(res.data)
                    // return res.data
            },
            fail: function(fail) {
                return reject(fail)
                    // return typeof cb == "function" && cb(false)
                    // return false
            }
        })
    })

}

module.exports = {
    http
}