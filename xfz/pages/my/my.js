//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    balance:0,
    storedCount:"",
    userInfo: {},
    hasUserInfo: true,
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
        console.log(res);
        app.globalData.logingData = res
        if(!res.needOpenCard){ //有值，非第一次
          that.setData({
            userInfo: app.globalData.logingData
          })
          wx.hideLoading()
        }else{ //需要开卡
          //that.loginBackUseInfo();
        }      
        that.balance();      
      });
    }else{
      if(app.globalData.logingData.nickName){
        that.setData({
          userInfo: app.globalData.logingData
        })
        wx.hideLoading()
      }else{
        //that.loginBackUseInfo();
      }
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      that.updateWXUserInfo();
    } else if (this.data.canIUse){
      this.setData({
        hasUserInfo: false
      })
      wx.showModal({
        title: '用户未授权',
        content: '如需正常使用该小程序功能，请按下方的授权登录',
        showCancel: false,
        success: function (resbtn) {
          if (resbtn.confirm) {
            
          }
        }
      })  
      /*// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.updateWXUserInfo();
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }*/
    } else {
      this.setData({
        hasUserInfo: false
      })
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.updateWXUserInfo();
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: function () {
          wx.showModal({
            title: '用户未授权',
            content: '如需正常使用该小程序功能，请按下方的授权登录',
            showCancel: false,
            success: function (resbtn) {
              if (resbtn.confirm) {
                
              }
            }
          })  
        }
      })
    }
  },
  updateWXUserInfo:function(e){
    var userInfo = app.globalData.userInfo;
    app.getJson(app.urlMap.updateUserInfo,"post",{
      nickName:userInfo.nickName,
      avatarUrl:userInfo.avatarUrl,
      gender:userInfo.gender,
      city:userInfo.city,
      province:userInfo.province,
      country:userInfo.country
    },function(res){
    });
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.updateWXUserInfo();
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tocard: function() {
    wx.navigateTo({
      url: 'card'
    })
    /*wx.navigateToMiniProgram({
      appId: 'wxeb490c6f9b154ef9', //固定为此 appid，不可改动
      extraData: {
        encrypt_card_id:"ThDxriOHZ76czYxn2KuAMGS97mCIs7ShSLmbPTrRj57KsA4ORZuNbbq72Hrtiax2",
        outer_str:"wx3e96083ff8d73c66",
        biz:"MzAxMzUxNTc1MA%3D%3D"
      },
      success: function() {
      },
      fail: function() {
      },
      complete: function() {
      }
    })*/
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
