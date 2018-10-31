//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[]
  },
  onLoad: function () {
    this.getList();
  },
  getList:function(){
    var that = this;
    app.getJson(app.urlMap.shoreList,"get",{
    },function(res){
        if(res.data.code == 0){
          that.setData({
            list:res.data.data.list
          })
        }     
    });
  },
  enterIndex:function(e) {
    var code = e.currentTarget.dataset.code;
    wx.setStorageSync('xfzshopcode', code);
    wx.switchTab({
      url: 'index'
    }) 
  }
})
