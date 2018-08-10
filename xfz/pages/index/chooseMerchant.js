//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //mlist:[]
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
        wx.showLoading({
          title: '加载中',
        })
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
            wx.hideLoading()
            var data = res.data.data;
            that.setData({
              mlist: data
            })  
            if(data.length == 1){
              if(data[0].merchantCode == "wx1d0a87b1729eff40"){
                wx.navigateToMiniProgram({
                  appId: 'wx1d0a87b1729eff40', 
                  extraData: {},
                  success: function() {
                  },
                  fail: function(res) {
                  },
                  complete: function() {

                  }
                })
              }else{
                wx.setStorageSync('xfzshopname', data[0].name);
                  var code = data[0].merchantCode;
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
            }
        } 
    });
  },
  enter: function(e) {
    var code = e.currentTarget.dataset.code;
    var name = e.currentTarget.dataset.name;
    wx.setStorageSync('xfzshopname', name);
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
