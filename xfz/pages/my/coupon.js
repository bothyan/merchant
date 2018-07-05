//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navArr:["hover","",""]
  },
  onLoad: function () {
    
  },
  tapnav: function(e) {
    var index = e.currentTarget.dataset.index;
    var navArr = ["","",""];
    navArr[index] = "hover";
    this.setData({
        navArr:navArr
    });   
  },
  tocoupondetail:function(e){
    wx.navigateTo({
      url: 'coupondetail'
    })
  }
})
