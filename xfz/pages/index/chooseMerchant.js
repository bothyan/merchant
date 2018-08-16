//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //mlist:[],
    formCard:false
  },
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene) 
    var that = this;
    //options.merchant = "1510673537";
    //options.page = "balance"
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
          if(options.merchant){
            that.setData({
              formCard:true  
            })
            app.getJson(app.urlMap.chooseMerchant,"post",{
                merchantCode:options.merchant
            },function(res){
                if(res.data.code == 0){
                  if(options.page == "balance"){
                    wx.navigateTo({
                      url: '../my/storedhistory'
                    })  
                  }else{
                    wx.navigateTo({
                      url: '../my/my'
                    })  
                  }
                } 
            });  
          }
          that.getList();         
      });
    }  

  },
  getList:function(){
    var that = this;
    var formCard = that.data.formCard;
    app.getJson(app.urlMap.merchantList,"get",{
    },function(res){
        if(res.data.code == 0){
            wx.hideLoading()
            var data = res.data.data;
            that.setData({
              mlist: data
            })  
            if(data.length == 1 && !formCard){
              if(data[0].merchantCode == "wx290d56197432d5fe"){
                wx.navigateToMiniProgram({
                  appId: 'wx290d56197432d5fe', 
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
