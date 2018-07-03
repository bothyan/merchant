//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectArr:[false,false,false,false,false]
  },
  onLoad: function () {
    
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changes:function(e){
    var index = e.currentTarget.dataset.index;
    var selectArr = this.data.selectArr;
    selectArr[index] = !selectArr[index];
    this.setData({
        selectArr:selectArr
    });   
  }
})
