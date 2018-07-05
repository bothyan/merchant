//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    
  },
  tocard: function() {
    wx.navigateTo({
      url: 'card'
    })
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
