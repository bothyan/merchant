//app.js
App({
  globalData:{
    sh_token:wx.getStorageSync('sh_token') || "",
    host:"https://ssl.zhihuishangjie.cn"
  }, 
  urlMap:{},
  onLaunch: function () {
    this.initUrlMap();
  },
  initUrlMap:function(){
    var host = this.globalData.host
    var urlMap = {
      login: host+"/app/merchant/login",
      merchantInfo: host+"/app/merchant/info",
      chargeList: host+"/app/merchant/user/chargeList",
      getUserInfo: host+"/app/merchant/user/getUserInfo",
      orderList: host+"/app/merchant/user/orderList",
      qrCode: host+"/app/merchant/user/qrCode",
      qrCodeImage: host+"/app/merchant/user/qrCodeImage",
      queryUserList: host+"/app/merchant/user/queryUserList",
      userSummary: host+"/app/merchant/user/summary",
      updateUserInfo: host+"/app/merchant/user/updateUserInfo",
      userInfo: host+"/app/merchant/user/userInfo",
      charge:host+"/app/merchant/charge/charge",
      chargeInfo:host+"/app/merchant/charge/chargeInfo",
      chargeConfig:host+"/app/merchant/charge/config",
      updateConfig:host+"/app/merchant/charge/updateConfig"
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
        'token':that.globalData.sh_token
      },
      method:method,
      data:data,
      success: function(res) {   
        successCallBack(res);
      }
    })
  } 
})