//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shopInfo:null
  },
  onLoad: function () {
    this.getInfo();
  },
  getInfo:function(){
    var that = this;
    app.getJson(app.urlMap.merchantInfo,"get",{},function(res){
      if(res.data.code == 0){
        that.setData({
          shopInfo:res.data.data
        })
      }
    });
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
