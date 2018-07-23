//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onShow:function(e){
    console.log("Show");
  },
  onLoad: function () {
    console.log("Load");
    wx.showLoading({
      title: '加载中',
    })
    this.getData();
  },
  getData:function(){
    wx.hideLoading()
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
