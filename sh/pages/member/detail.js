//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    
  },
  toedit: function() {
    wx.navigateTo({
      url: 'edit'
    })
  },
  tocoupon: function(){
    wx.navigateTo({
      url: 'coupon'
    })
  },
  tochuzhi:function(e){
    wx.navigateTo({
      url: 'store'
    })
  },
  toconsumption:function(e){
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
