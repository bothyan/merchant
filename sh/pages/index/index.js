//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    
  },
  members: function() {
    wx.navigateTo({
      url: '../member/list'
    })
  },
})
