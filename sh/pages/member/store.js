//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchfocus:false,
  },
  onLoad: function () {
    
  },
  searchfocus: function(){
    this.setData({
        searchfocus:true
    })
  },
  tosearch: function() {
    wx.navigateTo({
      url: 'recharge'
    })
  }
})
