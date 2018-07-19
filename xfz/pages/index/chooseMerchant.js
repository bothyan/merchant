//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mlist:[]
  },
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene) 
    var that = this;
    if(options.scene){
        app.globalData.scene = scene;
        wx.navigateTo({
          url: '../my/my'
        })
    }else{
        app.login(function(res){
            app.globalData.logingData = res
            that.getList();         
        });
    }
    
  },
  getList:function(){
    var that = this;
    app.getJson(app.urlMap.merchantList,"get",{
    },function(res){
        if(res.data.code == 0){
            var data = res.data.data;
            that.setData({
              mlist: data
            })
        } 
    });
  },
  enter: function(e) {
    var code = e.currentTarget.dataset.code;
    app.getJson(app.urlMap.chooseMerchant,"post",{
        merchantCode:code
    },function(res){
        if(res.data.code == 0){
           wx.navigateTo({
              url: '../my/my'
            })
        } 
    });
  }
})
