//index.js
//获取应用实例
const app = getApp()
var timer = null
Page({
  data: {
    searchfocus:false,
    scene:"",
    codeImg:"",
    tag:true
  },
  onLoad: function () {
    this.getQrCode();
  },
  getQrCode:function(){
    var that = this;
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
    this.setData({
      codeImg:img
    })
    timer = setTimeout(function () {
      that.getUserInfo()
    }, 1000);
  },
  getUserInfo:function(){
    var that = this;
    //if(that.data.tag){
      app.getJson(app.urlMap.userInfo,"get",{
        scene:that.data.scene
      },function(res){
        if(res.data.code == 0){
          var infors = res.data.data;
          //console.log(res.data.data);
          if(infors.realName){
            wx.navigateTo({
              url: 'recharge?id='+infors.userId
            })
          }else{
            wx.navigateTo({
              url: 'register?id='+infors.userId
            })
          }
        }else{
          that.getUserInfo();
        }
      });
    //}
  },
  searchfocus: function(){
    this.setData({
        searchfocus:true
    })
  },
  tosearch: function() {
    wx.navigateTo({
      url: 'recharge'
    })
  }
})
