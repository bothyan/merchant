//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    
  },
  tagsetting:function(){

  },
  tapshop:function(){
    wx.navigateTo({
      url: 'shop'
    })
  },
  tapMarketing:function(){
    wx.navigateTo({
      url: 'marketing'
    })
  } 
})
