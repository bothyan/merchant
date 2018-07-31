//index.js
//获取应用实例
const app = getApp()
var timer = null
Page({
  data: {
    searchfocus:false,
    scene:"",
    codeImg:"",
    pageHided:false
  },
  onLoad: function () {
    this.getQrCode();
  },
  onUnload:function(){
    this.setData({
      pageHided:true
    })
  },
  getQrCode:function(){
    var that = this;
    wx.showLoading({
      title: '加载二维码中'
    })
    app.getJson(app.urlMap.qrCode,"get",{},function(res){
      if(res.data.code == 0){
        that.setData({
          scene:res.data.data
        }) 
        that.getQrCodeImage();
      }
    });
  },
  getQrCodeImage:function(){
    var that = this;
    console.log(that.data.scene)
    var img = app.urlMap.qrCodeImage+"?scene="+that.data.scene;
    wx.hideLoading()
    this.setData({
      codeImg:img
    })
    timer = setTimeout(function () {
      that.getUserInfo()
    }, 1000);
  },
  getUserInfo:function(){
    var that = this;
    if(that.data.pageHided){
      return
    }
    app.getJson(app.urlMap.userInfo,"get",{
      scene:that.data.scene
    },function(res){
      if(res.data.code == 0){
        var infors = res.data.data;
        console.log(res.data.data);
        wx.navigateTo({
            url: 'detail?id='+infors.userId
          })
        /*if(infors.realName){
          wx.navigateTo({
            url: 'detail?id='+infors.userId
          })
        }else{
          wx.navigateTo({
            url: 'register?id='+infors.userId
          })
        }*/
      }else{
        that.getUserInfo();
      }
    });
  },
  searchfocus: function(){
    this.setData({
        searchfocus:true
    })
  },
  tosearch:function(e){
    var that = this;
    var param = {
      pageSize:10,
      pageNo:1,
      createTimeOrder:"DESC",
      payAmountOrder:"DESC",
      payCountOrder:"DESC",
      payTimeOrder:"DESC"
    };

    if(e.detail.value !== ""){
      param.phone = e.detail.value;
      app.getJson(app.urlMap.queryUserList,"get",param,function(res){
        console.log(res);
        if(res.data.code == 0){
          var list = res.data.data.list;
          if(list.length == 0){
            wx.showToast({
              title: '搜索结果为空',
              icon: 'none',
              duration: 1500
            })
          }else if(list.length == 1){
            wx.navigateTo({
              url: 'detail?id='+list[0].userId
            })
          }else{
            wx.navigateTo({
              url: 'list?phone='+param.phone
            })
          }
        }
      });
    }
    
  },
})
