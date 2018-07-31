//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //mlist:[]
  },
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene || "39b1d44f7e1ded04cf1cae42310c54ea") 
    var that = this;
    if(scene){
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
            console.log(data);
            that.setData({
              mlist: data
            })  
            if(data.length == 1){
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
