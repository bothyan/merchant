//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    balance:0,
    storedCount:"",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow:function(data){
    
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    if(app.globalData.scene){
      app.login(function(res){
        app.globalData.logingData = res
        console.log(res);
        if(!res.needUserInfo){ //已开过卡
          that.setData({
            userInfo: app.globalData.logingData,
            hasUserInfo:true
          })
        }else{ //需要开卡
         // that.loginBackUseInfo();
        }  
        wx.hideLoading()    
        that.balance();      
      });
    }else{
      console.log(app.globalData.logingData)
      if(!app.globalData.logingData.needUserInfo){
        that.setData({
          userInfo: app.globalData.logingData,
          hasUserInfo:true
        })
      }else{
        //that.loginBackUseInfo();
      }
      wx.hideLoading()
      that.balance();
    }
  },
  balance:function(){
    var that = this;
    app.getJson(app.urlMap.balancesummary,"get",{
    },function(res){
        if(res.data.code == 0){
            var data = res.data.data;
            that.setData({
              balance: data.balance
            })
        }     
    });
  },
  loginBackUseInfo:function(){
    var that = this;
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: app.globalData.userInfo
      })
      that.updateWXUserInfo();
    }
  },
  updateWXUserInfo:function(e){
    var that = this;
    var userInfo = app.globalData.userInfo;
    app.getJson(app.urlMap.updateUserInfo,"post",{
      nickName:userInfo.nickName,
      avatarUrl:userInfo.avatarUrl,
      gender:userInfo.gender,
      city:userInfo.city,
      province:userInfo.province,
      country:userInfo.country
    },function(res){
      console.log(res);
      if(res.data.code == 0){
        wx.hideLoading()
        that.tocard();
      }
      
    });
  },
  getUserInfo: function(e) {
    console.log(e);
    if(e.detail.userInfo){
      wx.showLoading({
        title: '授权中',
      })
      app.globalData.userInfo = e.detail.userInfo
      this.updateWXUserInfo();
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  tocard: function() {
    console.log(app.globalData.logingData)
    if(app.globalData.logingData.needOpenCard){
      var data = {
        encrypt_card_id:decodeURIComponent(app.globalData.logingData.cardId),
        outer_str:app.globalData.logingData.outerStr,
        biz:app.globalData.logingData.biz
      }
      wx.navigateToMiniProgram({
        appId: 'wxeb490c6f9b154ef9', //固定为此 appid，不可改动
        extraData: data,
        success: function() {
        },
        fail: function(res) {
        },
        complete: function() {
        }
      })    
    }else{
      wx.navigateTo({
        url: 'card'
      })
    }
  },
  toyue:function(){
    wx.navigateTo({
      url: 'yue'
    })
   },
   tocoupon:function(){
    wx.navigateTo({
      url: 'coupon'
    })
   },
   toconsume:function(){
     wx.navigateTo({
      url: 'consumehistory'
    })
   },
   tostored:function(){
     wx.navigateTo({
      url: 'storedhistory'
    })
   }  
})
