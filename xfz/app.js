//app.js
App({
  globalData: {
    scene:"",
    //xfz_token:wx.getStorageSync('xfz_token') || "",
    xfz_token:"",
    userInfo: null,
    logingData:null,
    host:"https://ssl.zhihuishangjie.cn"
  },  
  urlMap:{},
  onLaunch: function () {
    // 获取用户信息
    this.initUrlMap();
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
        }else{
          console.log("5555");
        }
      }
    })
  },
  login:function(cb){
    var that = this;
    // 登录
    wx.login({
      success: function(res){
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var data = {};
        data.code = res.code;
        if(that.globalData.scene !==""){
          data.scene = that.globalData.scene
        }
        wx.request({
            url: that.globalData.host+"/app/user/login",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest"
            },
            method:"post",
            data:data,
            success: function(res) {   
              var data = res.data;
              if(data.code == 0){
                var xfz_token = data.data.accessToken;
                that.globalData.xfz_token = xfz_token;
                /*if(data.data.nickName){ //有值，非第一次
                }else{ //null 第一次登录 }
                //wx.setStorageSync('xfz_token', xfz_token);
                */
                typeof cb == "function" && cb(data.data);
              }
            }
        })
      }
    })
  },
  initUrlMap:function(){
    var host = this.globalData.host
    var urlMap = {
      login: host+"/app/user/login",
      updateUserInfo: host+"/app/user/updateWXUserInfo",
      userCard: host+"/app/user/card",
      chooseMerchant: host+"/app/user/chooseMerchant",
      merchantList: host+"/app/user/merchantList",
      chargeList: host+"/app/user/balance/chargeList",
      balancesummary: host+"/app/user/balance/summary",
      orderList: host+"/app/user/pay/orderList",
      paySummary: host+"/app/user/pay/summary"
    };
    this.urlMap = urlMap;
  },
  getJson:function(url,method,data,successCallBack){
    var that = this;
    var data = data;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'accessToken':that.globalData.xfz_token
      },
      method:method,
      data:data,
      success: function(res) {   
        successCallBack(res);
      }
    })
  } 
})