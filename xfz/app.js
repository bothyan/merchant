//app.js
App({
  globalData: {
    needOpenCard:true,
    scene:"",
    //xfz_token:wx.getStorageSync('xfz_token') || "",
    xfz_token:"",
    userInfo: null,
    logingData:null,
    host:"https://ssl.zhihuishangjie.cn",
    card:{

    }
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
        }
      }
    })
  },
  onShow :function(data){
    var that = this;
    console.log(data);
    if(data.referrerInfo && data.referrerInfo.appId == "wxeb490c6f9b154ef9"){
      var callbackdata = data.referrerInfo.extraData;
      /*var callbackdata = {
        activate_ticket: "fDZv9eMQAFfrNr3XBoqhb1ogS2+sWvYpkUv/HckCCZ+y4WaRfBnC9IJliHu3XdjAEk+TPd8SYkOQX3ZJGjgOlzoCeOtQvdhbNuhzk3lzFRk=",
        card_id:"pzvvS1BdU3EC3eUd_djhCz_JqHgo",
        code:"050648570399",
        wx_activate_after_submit_url:"https://api.weixin.qq.com?card_id=pzvvS1BdU3EC3eUd_djhCz_JqHgo&encrypt_code=gSHaes50dDUoXJalv4Msld9%2BkhHS7%2FXX4kC5Uffz9B8%3D&openid=ozvvS1NoO-FETbq-lbejVCPsjvYU&outer_str=4"
      }*/
      var card = {};
      card.code = callbackdata.code;
      card.card_id = callbackdata.card_id;
      that.globalData.card = card;
      var params = that.params(callbackdata.wx_activate_after_submit_url.split("?")[1]);
      console.log(params)
      wx.request({
        url: "https://ssl.zhihuishangjie.cn/app/user/submitOpenCardInfo",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'accessToken':that.globalData.xfz_token
        },
        method:"post",
        data:{
          encryptCode:params.encrypt_code,
          acitvateTicket:callbackdata.activate_ticket,
          cardId:callbackdata.card_id,
          openId: params.openid
        },
        success: function(res) {   
          console.log(res);
          if(res.data.code == 0){

          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            })
          }
          
        }
      })
    }
/* wx.openSetting({
      success: (res) => {
      }
    })*/
  },
  params:function(query){
    var args = new Object();
    var pairs = query.split("&"); // Break at ampersand
    for(var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');
      if (pos == -1) continue;
      var argname = pairs[i].substring(0,pos);
      var value = pairs[i].substring(pos+1);
      value = decodeURIComponent(value);
      args[argname] = value;
    }

    return args;
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
                //that.ajaxss();
                typeof cb == "function" && cb(data.data);
              }else{
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 1500
                })
              }
            }
        })
      }
    })
  },
  /*ajaxss:function(){
    var that = this;
    //if(data.referrerInfo && data.referrerInfo.appId == "wxeb490c6f9b154ef9"){
      //var callbackdata = data.referrerInfo.extraData;
      var callbackdata = {
        activate_ticket: "fDZv9eMQAFfrNr3XBoqhb1ogS2+sWvYpkUv/HckCCZ+y4WaRfBnC9IJliHu3XdjAEk+TPd8SYkOQX3ZJGjgOlzoCeOtQvdhbNuhzk3lzFRk=",
        card_id:"pzvvS1BdU3EC3eUd_djhCz_JqHgo",
        code:"050648570399",
        wx_activate_after_submit_url:"https://api.weixin.qq.com?card_id=pzvvS1BdU3EC3eUd_djhCz_JqHgo&encrypt_code=gSHaes50dDUoXJalv4Msld9%2BkhHS7%2FXX4kC5Uffz9B8%3D&openid=ozvvS1NoO-FETbq-lbejVCPsjvYU&outer_str=4"
      }
      var params = that.params(callbackdata.wx_activate_after_submit_url.split("?")[1]);
      console.log(params)
      wx.request({
        url: "https://ssl.zhihuishangjie.cn/app/user/submitOpenCardInfo",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'accessToken':that.globalData.xfz_token
        },
        method:"post",
        data:{
          encryptCode:params.encrypt_code,
          acitvateTicket:callbackdata.activate_ticket,
          cardId:callbackdata.card_id,
          openId: params.openid
        },
        success: function(res) {   
          console.log(res);
          if(res.data.code == 0){
            
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            })
          }
          
        }
      })
  },*/
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
        if(res.data.code == 0){
          successCallBack(res);
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
        
      }
    })
  },
  getcard:function(cb){
    var that = this;
    that.getJson(that.urlMap.userCard,"get",{
    },function(res){
      if(res.data.code == 0){
        typeof cb == "function" && cb(res.data.data);
      }
    });
  } 
})