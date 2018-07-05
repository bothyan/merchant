//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    poplay:false
  },
  onLoad: function () {
    
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  hidepop:function(){
    this.setData({
        poplay:false
    })
  },
  showpop:function(){
    this.setData({
        poplay:true
    })
  }
})
