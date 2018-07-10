//app.js
App({
  globalData: {
    xfz_token:wx.getStorageSync('xfz_token') || "",
    userInfo: null,
    host:"https://ssl.zhihuishangjie.cn"
  },  
  urlMap:{},
  onLaunch: function () {
    this.login();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login:function(cb){
    var that = this;
    console.log(that.globalData.host)
    // 登录
    wx.login({
      success: function(res){
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        wx.request({
            url: that.globalData.host+"/app/user/login",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest"
            },
            method:"post",
            data:{
              code:res.code
            },
            success: function(res) {   
             console.log(res);
             typeof cb == "function" && cb();
            }
        })
      }
    })
  },
  initUrlMap:function(){
    var host = this.globalData.host
    var urlMap = {
      login: host+"/app/user/login"
    };
    this.urlMap = urlMap;
  }
})