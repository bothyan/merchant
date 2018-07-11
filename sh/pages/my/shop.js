//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shopInfo:null,
  },
  onLoad: function () {
    this.getInfo();
  },
  getInfo:function(){
    var that = this;
    app.getJson(app.urlMap.merchantInfo,"get",{},function(res){
      console.log(res)
      if(res.data.code == 0){
        that.setData({
          shopInfo:res.data.data
        })
      }
    });
  }
})
