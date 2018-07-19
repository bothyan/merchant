//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    this.getData();
  },
  getData:function(){
    
  },
  members: function() {
    wx.navigateTo({
      url: '../member/list'
    })
  },
  notopen:function(){
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 1500
    })
  }
})
