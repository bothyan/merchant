//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    
  },
  login: function() {
    wx.switchTab({
      url: 'index'
    })
  },
  forget: function(){
    wx.showToast({
      title: '请登录商家后台系统查看或充值',
      icon: 'none',
      duration: 1500
    })
  },
  zhuce: function(){
    wx.showToast({
      title: '请联系管理员',
      icon: 'none',
      duration: 1500
    })
  }
})
