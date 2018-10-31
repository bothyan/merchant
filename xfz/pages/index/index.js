//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    message: null
  },
  onLoad: function (options) {

  },
  onShow: function(){
    var that = this;
    var code = wx.getStorageSync('xfzshopcode') || "";
    if(code == ""){
      app.getJson(app.urlMap.shoreList,"get",{
      },function(res){
          if(res.data.code == 0){
            wx.setStorageSync('xfzshopcode', res.data.data.list[0].storeCode);
            that.getDetail();
          }     
      });
    }else{
      that.getDetail();
    } 
  },
  getDetail:function(){
    var that = this;
    var code = wx.getStorageSync('xfzshopcode');
    app.getJson(app.urlMap.shoreHome,"get",{
      storeCode : code
    },function(res){
        if(res.data.code == 0){
            var storeInfoVO = res.data.data.storeInfoVO;
            if(!storeInfoVO){
              storeInfoVO = {};
              storeInfoVO.parking = "";
              storeInfoVO.room = "";
              storeInfoVO.freeDrinking = "";
              storeInfoVO.smoking = "";
              storeInfoVO.wifi = "";
            }
            storeInfoVO.parking = storeInfoVO.parking == "" ? "无" : "有"; 
            storeInfoVO.room = storeInfoVO.room == "" ? "无" : "有"; 
            storeInfoVO.freeDrinking = storeInfoVO.freeDrinking == "" ? "无" : "有"; 
            storeInfoVO.smoking = storeInfoVO.smoking == "" ? "无" : "有"; 
            if(storeInfoVO.wifi == ""){
              storeInfoVO.wifi = "无"
            }else{             
              storeInfoVO.wifiObj = JSON.parse(storeInfoVO.wifi) 
              storeInfoVO.wifi = "有"
            }
            res.data.data.storeInfoVO = storeInfoVO;
            that.setData({
              message:res.data.data
            })
        }     
    });  
  },
  toshops: function() {
    wx.navigateTo({
      url: 'shoplist'
    })
  },
  calling: function (e) {
    var num = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: num,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  copypassword: function(e){
    var num = e.currentTarget.dataset.num;
    wx.setClipboardData({
      data: num,
      success: function () {
        console.log("复制成功")
      },
      fail: function () {
        console.log("复制失败")
      }
    })
  }
})
