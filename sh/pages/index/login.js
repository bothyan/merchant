//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name:"",
    password:""
  },
  onLoad: function () {
    //console.log(app.globalData.sh_token);
    if(app.globalData.sh_token !== ""){
      wx.switchTab({
        url: 'index'
      })
    }
  },
  login: function() {
    var that = this;
    var name = this.data.name;
    var password = this.data.password;
    if(name == ""){
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if(password == ""){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      })
      return
    } 
    wx.showLoading({
      title: '登陆中',
    })
    wx.request({
      url: app.urlMap.login,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:"post",
      data:{
        username:name,
        password:password
      },
      success: function(res) { 
        wx.hideLoading()  
        if(res.data.code == 0){
          wx.setStorageSync('sh_token', res.data.data.token); 
          app.globalData.sh_token = res.data.data.token; 
          wx.switchTab({
            url: 'index'
          })  
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  changeName:function(e){
    this.setData({name:e.detail.value});
  },
  changePassword:function(e){
    this.setData({password:e.detail.value});
  },
  forget: function(){
    wx.showToast({
      title: '请登录商家后台系统查看或充值',
      icon: 'none',
      duration: 1500
    })
  },
  zhuce: function(){
    wx.showToast({
      title: '请联系管理员',
      icon: 'none',
      duration: 1500
    })
  }
})
